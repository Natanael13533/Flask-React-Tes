from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Kelas, Siswa, Guru, Parents

api = Blueprint("api", __name__)

# ----- Autentikasi -----
@api.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username sudah ada."}), 400
    hashed_pwd = generate_password_hash(password)
    user = User(username=username, password=hashed_pwd)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User berhasil didaftarkan."}), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Username/password salah"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200

# ----- CRUD Kelas -----
@api.route("/kelas", methods=["GET"])
@jwt_required()
def get_kelas():
    kelas_list = Kelas.query.all()
    result = []

    for k in kelas_list:
        result.append({
            "id": k.id,
            "name": k.name,
            "siswa": [s.name for s in k.siswa],  # if relationship is list of siswa
            "guru": [g.name for g in k.guru]  # if single guru object
        })

    return jsonify(result), 200

@api.route("/kelas/<int:kelas_id>", methods=["GET"])
@jwt_required()
def detail_kelas(kelas_id):
    kelas = Kelas.query.get_or_404(kelas_id)
    return jsonify({
        "id": kelas.id,
        "name": kelas.name,
        "siswa": [{"id": s.id, "name": s.name} for s in kelas.siswa],
        "guru": [{"id": g.id, "name": g.name} for g in kelas.guru],
    }), 200

@api.route("/kelas", methods=["POST"])
@jwt_required()
def add_kelas():
    data = request.json
    name = data.get("name")
    kelas = Kelas(name=name)
    db.session.add(kelas)
    db.session.commit()
    return jsonify({"msg": "Kelas ditambahkan", "id": kelas.id}), 201

@api.route("/kelas/<int:kelas_id>", methods=["PUT"])
@jwt_required()
def update_kelas(kelas_id):
    data = request.json
    kelas = Kelas.query.get_or_404(kelas_id)
    kelas.name = data.get("name", kelas.name)
    db.session.commit()
    return jsonify({"msg": "Kelas diperbarui"}), 200

@api.route("/kelas/<int:kelas_id>", methods=["DELETE"])
@jwt_required()
def delete_kelas(kelas_id):
    kelas = Kelas.query.get_or_404(kelas_id)
    db.session.delete(kelas)
    db.session.commit()
    return jsonify({"msg": "Kelas dihapus"}), 200

# ----- CRUD Siswa -----
@api.route("/siswa", methods=["GET"])
@jwt_required()
def get_siswas():
    siswa_list = Siswa.query.all()
    result = []

    for s in siswa_list:
        result.append({
            "id": s.id,
            "name": s.name,
            "parents": [s.name for s in s.parents],  # if relationship is list of siswa
        })

    return jsonify(result), 200

@api.route("/siswa", methods=["POST"])
@jwt_required()
def add_siswa():
    data = request.json
    name = data.get("name")
    kelas_id = data.get("kelas_id")
    siswa = Siswa(name=name, kelas_id=kelas_id)
    db.session.add(siswa)
    db.session.commit()
    return jsonify({"msg": "Siswa ditambahkan", "id": siswa.id}), 201

@api.route("/siswa/<int:siswa_id>", methods=["GET"])
@jwt_required()
def detail_siswa(siswa_id):
    siswa = Siswa.query.get_or_404(siswa_id)
    return jsonify({
        "id": siswa.id,
        "name": siswa.name,
        "kelas_id": siswa.kelas_id
    }), 200

@api.route("/siswa/<int:siswa_id>", methods=["PUT"])
@jwt_required()
def update_siswa(siswa_id):
    data = request.json
    siswa = Siswa.query.get_or_404(siswa_id)
    siswa.name = data.get("name", siswa.name)
    siswa.kelas_id = data.get("kelas_id", siswa.kelas_id)
    db.session.commit()
    return jsonify({"msg": "Siswa diperbarui"}), 200

@api.route("/siswa/<int:siswa_id>", methods=["DELETE"])
@jwt_required()
def delete_siswa(siswa_id):
    siswa = Siswa.query.get_or_404(siswa_id)
    db.session.delete(siswa)
    db.session.commit()
    return jsonify({"msg": "Siswa dihapus"}), 200

# List siswa berdasarkan kelas
@api.route("/kelas/<int:kelas_id>/siswa", methods=["GET"])
@jwt_required()
def get_siswas_by_kelas(kelas_id):
    siswas = Siswa.query.filter_by(kelas_id=kelas_id).all()
    result = [{"id": s.id, "name": s.name} for s in siswas]
    return jsonify(result), 200

# ----- CRUD Guru -----
@api.route("/guru", methods=["GET"])
@jwt_required()
def get_gurus():
    gurus = Guru.query.all()
    result = [{"id": g.id, "name": g.name, "kelas_id": g.kelas_id} for g in gurus]
    return jsonify(result), 200

@api.route("/guru", methods=["POST"])
@jwt_required()
def add_guru():
    data = request.json
    name = data.get("name")
    kelas_id = data.get("kelas_id")
    guru = Guru(name=name, kelas_id=kelas_id)
    db.session.add(guru)
    db.session.commit()
    return jsonify({"msg": "Guru ditambahkan", "id": guru.id}), 201

@api.route("/guru/<int:guru_id>", methods=["GET"])
@jwt_required()
def detail_guru(guru_id):
    guru = Guru.query.get_or_404(guru_id)
    return jsonify({
        "id": guru.id,
        "name": guru.name,
        "kelas_id": guru.kelas_id
    }), 200

@api.route("/guru/<int:guru_id>", methods=["PUT"])
@jwt_required()
def update_guru(guru_id):
    data = request.json
    guru = Guru.query.get_or_404(guru_id)
    guru.name = data.get("name", guru.name)
    guru.kelas_id = data.get("kelas_id", guru.kelas_id)
    db.session.commit()
    return jsonify({"msg": "Guru diperbarui"}), 200

@api.route("/guru/<int:guru_id>", methods=["DELETE"])
@jwt_required()
def delete_guru(guru_id):
    guru = Guru.query.get_or_404(guru_id)
    db.session.delete(guru)
    db.session.commit()
    return jsonify({"msg": "Guru dihapus"}), 200

# List guru berdasarkan kelas
@api.route("/kelas/<int:kelas_id>/guru", methods=["GET"])
@jwt_required()
def get_gurus_by_kelas(kelas_id):
    guru = Guru.query.filter_by(kelas_id=kelas_id).all()
    result = [{"id": g.id, "name": g.name} for g in guru]
    return jsonify(result), 200

# ----- CRUD orang Tua -----
@api.route("/parents", methods=["GET"])
@jwt_required()
def get_parents():
    parents = Parents.query.all()
    result = [{"id": p.id, "name": p.name, "siswa_id": p.siswa_id} for p in parents]
    return jsonify(result), 200

@api.route("/parent", methods=["POST"])
@jwt_required()
def add_parent():
    data = request.json
    name = data.get("name")
    siswa_id = data.get("siswa_id")
    parent = Parents(name=name, siswa_id=siswa_id)
    db.session.add(parent)
    db.session.commit()
    return jsonify({"msg": "Orang Tua siswa ditambahkan", "id": parent.id}), 201

@api.route("/parent/<int:parent_id>", methods=["GET"])
@jwt_required()
def detail_parent(parent_id):
    parent = Parents.query.get_or_404(parent_id)
    return jsonify({
        "id": parent.id,
        "name": parent.name,
        "siswa_id": parent.siswa_id
    }), 200

@api.route("/parent/<int:parent_id>", methods=["PUT"])
@jwt_required()
def update_parent(parent_id):
    data = request.json
    parent = Parents.query.get_or_404(parent_id)
    parent.name = data.get("name", parent.name)
    parent.siswa_id = data.get("siswa_id", parent.siswa_id)
    db.session.commit()
    return jsonify({"msg": "Orang Tua diperbarui"}), 200

@api.route("/parent/<int:parent_id>", methods=["DELETE"])
@jwt_required()
def delete_parent(parent_id):
    parent = Parents.query.get_or_404(parent_id)
    db.session.delete(parent)
    db.session.commit()
    return jsonify({"msg": "Orang tua dihapus"}), 200

# List orang tua berdasarkan siswa
@api.route("/siswa/<int:siswa_id>/parent", methods=["GET"])
@jwt_required()
def get_parents_by_siswa(siswa_id):
    parent = Parents.query.filter_by(siswa_id=siswa_id).all()
    result = [{"id": g.id, "name": g.name} for g in parent]
    return jsonify(result), 200

# Endpoint untuk mendapatkan list lengkap (Siswa, Kelas, Guru)
@api.route("/all-data", methods=["GET"])
@jwt_required()
def get_all_data():
    kelas_list = Kelas.query.all()
    data = []
    for k in kelas_list:
        kelas_data = {
            "id": k.id,
            "kelas": k.name,
            "siswa": [{"id": s.id, "name": s.name} for s in k.siswa],
            "guru": [{"id": g.id, "name": g.name} for g in k.guru],
        }
        data.append(kelas_data)
    return jsonify(data), 200
