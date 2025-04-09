import React, { useEffect, useState } from "react";
import api from "../api";

const AllDataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await api.get("/all-data");
      setData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data lengkap", error);
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
            <th>Guru</th>
            <th>Siswa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kelas, index) => (
            <tr key={kelas.id}>
              <td>{index + 1}</td>
              <td>{kelas.kelas}</td>
              <td>
                {kelas.guru.length > 0 ? (
                  kelas.guru.map((g, i) => (
                    <div key={i}>{g.name}</div>
                  ))
                ) : (
                  <em>Tidak ada</em>
                )}
              </td>
              <td>
                {kelas.siswa.length > 0 ? (
                  kelas.siswa.map((s, i) => (
                    <div key={i}>{s.name}</div>
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

export default AllDataTable;
