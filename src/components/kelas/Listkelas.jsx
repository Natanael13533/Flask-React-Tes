import React from "react";
import api from "../../api";
import { NavLink } from "react-router-dom";

const ListKelas = ({ kelas, refreshData }) => {
  // Fungsi untuk menghapus kelas
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus kelas ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/kelas/${id}`);
      alert("Kelas berhasil dihapus");
      // Refresh data setelah delete
      if (refreshData) {
        refreshData();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Gagal menghapus kelas", error);
      alert("Gagal menghapus kelas");
    }
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((k, index) => (
            <tr key={k.id}>
              <td>{index + 1}</td>
              <td>{k.name}</td>
              <td>
                <NavLink to={`/kelas/detail/${k.id}`} className="btn btn-success mx-2">Detail</NavLink>
                <NavLink to={`/kelas/edit/${k.id}`} className="btn btn-info mx-2">Edit</NavLink>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(k.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListKelas;
