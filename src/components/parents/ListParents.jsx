import React from "react";
import { NavLink } from "react-router-dom";
import api from "../../api";

const ListParents = ({ parent, siswaList }) => {
  // Fungsi untuk menghapus parent
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus orang tua murid ini?");
    if (!confirmDelete) return;

    try {
      // Pastikan endpoint sesuai dengan API backend, misalnya /parent/<id>
      await api.delete(`/parent/${id}`);
      // Setelah berhasil delete, refresh daftar parent
      alert("Orang Tua berhasil dihapus");
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus Orang Tua", error);
      alert("Gagal menghapus Orang Tua");
    }
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama parent</th>
            <th>Anak</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {parent.map((p, index) => {
            // Cari nama kelas berdasarkan kelas_id parent
            const selectedSiswa = siswaList.find(
              (siswa) => parseInt(siswa.id) === parseInt(p.siswa_id)
            );
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>{selectedSiswa ? selectedSiswa.name : "Tidak ada Siswa"}</td>
                <td>
                  <NavLink to={`/parent/detail/${p.id}`} className="btn btn-success mx-2">Detail</NavLink>
                  <NavLink to={`/parent/edit/${p.id}`} className="btn btn-info mx-2">Edit</NavLink>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListParents;
