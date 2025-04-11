from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)  # Simpan hash password di produksi

class Kelas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    siswa = db.relationship('Siswa', backref='kelas', lazy=True)
    guru = db.relationship('Guru', backref='kelas', lazy=True)

class Siswa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    kelas_id = db.Column(db.Integer, db.ForeignKey('kelas.id'), nullable=False)

class Guru(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    kelas_id = db.Column(db.Integer, db.ForeignKey('kelas.id'), nullable=False)
