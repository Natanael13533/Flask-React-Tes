import React, { useEffect, useState } from "react";
import api from "../api"; // pastikan ini mengarah ke Axios instance kamu

const KelasSiswaViewer = () => {
  const [kelasList, setKelasList] = useState([]);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    try {
      const res = await api.get("/kelas");
      setKelasList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kelas", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Semua Data</h2>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelas</th>
            <th>Siswa</th>
          </tr>
        </thead>
        <tbody>
          {kelasList.map((kelas, index) => (
            <tr key={kelas.id}>
              <td>{index + 1}</td>
              <td>{kelas.name}</td>
              <td>
                {Array.isArray(kelas.siswa) && kelas.siswa.length > 0 ? (
                  kelas.siswa.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))
                ) : (
                  <em>Tidak ada</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KelasSiswaViewer;
