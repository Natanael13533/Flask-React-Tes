import React from "react";
import { NavLink } from "react-router-dom";
import api from "../../api";

const List = ({ siswa, kelasList }) => {
  // Fungsi untuk menghapus siswa
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus siswa ini?");
    if (!confirmDelete) return;

    try {
      // Pastikan endpoint sesuai dengan API backend, misalnya /siswa/<id>
      await api.delete(`/siswa/${id}`);
      // Setelah berhasil delete, refresh daftar siswa
      alert("Siswa berhasil dihapus");
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus siswa", error);
      alert("Gagal menghapus siswa");
    }
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s, index) => {
            // Cari nama kelas berdasarkan kelas_id siswa
            const selectedKelas = kelasList.find(
              (kelas) => parseInt(kelas.id) === parseInt(s.kelas_id)
            );
            return (
              <tr key={s.id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{selectedKelas ? selectedKelas.name : "Tidak ada kelas"}</td>
                <td>
                  <NavLink to={`/siswa/detail/${s.id}`} className="btn btn-success mx-2">Detail</NavLink>
                  <NavLink to={`/siswa/edit/${s.id}`} className="btn btn-info mx-2">Edit</NavLink>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
