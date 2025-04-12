import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance

const SiswaParentViewer = () => {
  const [siswaList, setSiswaList] = useState([]);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    try {
      const res = await api.get("/siswa"); // Endpoint: ambil semua kelas
      setSiswaList(res.data);
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
            <th>Siswa</th>
            <th>Orang Tua</th>
          </tr>
        </thead>
        <tbody>
          {siswaList.map((siswa, index) => (
            <tr key={siswa.id}>
              <td>{index + 1}</td>
              <td>{siswa.name}</td>
              <td>
                {Array.isArray(siswa.parents) && siswa.parents.length > 0 ? (
                  siswa.parents.map((s, i) => <div key={i}>{s}</div>)
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

export default SiswaParentViewer;
