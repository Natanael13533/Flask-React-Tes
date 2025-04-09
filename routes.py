from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Kelas, Siswa, Guru

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
    result = [{"id": k.id, "name": k.name} for k in kelas_list]
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
    siswas = Siswa.query.all()
    result = [{"id": s.id, "name": s.name, "kelas_id": s.kelas_id} for s in siswas]
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
