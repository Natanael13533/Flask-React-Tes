import React from "react";
import { NavLink } from "react-router-dom";
import api from "../../api";

const ListGuru = ({ guru, kelasList }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus guru ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/guru/${id}`);
      alert("Guru berhasil dihapus");
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus guru", error);
      alert("Gagal menghapus guru");
    }
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama Guru</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guru.map((g, index) => {
            const selectedKelas = kelasList.find(
              (kelas) => parseInt(kelas.id) === parseInt(g.kelas_id)
            );
            return (
              <tr key={g.id}>
                <td>{index + 1}</td>
                <td>{g.name}</td>
                <td>{selectedKelas ? selectedKelas.name : "Tidak ada kelas"}</td>
                <td>
                  <NavLink to={`/guru/detail/${g.id}`} className="btn btn-success mx-2">Detail</NavLink>
                  <NavLink to={`/guru/edit/${g.id}`} className="btn btn-info mx-2">Edit</NavLink>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(g.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListGuru;
