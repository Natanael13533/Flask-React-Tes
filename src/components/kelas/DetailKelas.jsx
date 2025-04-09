import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const DetailKelas = () => {
  const { id } = useParams();
  const kelasId = parseInt(id);
  const [kelas, setKelas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const res = await api.get(`/kelas/${kelasId}`);
        setKelas(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal mengambil data kelas");
      }
    };

    fetchKelas();
  }, [kelasId]);

  if (error) return <div>{error}</div>;
  if (!kelas) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Detail Kelas</h2>
      <p><strong>Nama Kelas:</strong> {kelas.name}</p>

      <h4>Daftar Siswa:</h4>
      <ul>
        {kelas.siswa.length > 0 ? (
          kelas.siswa.map((siswa) => (
            <li key={siswa.id}>{siswa.name}</li>
          ))
        ) : (
          <li>Tidak ada siswa</li>
        )}
      </ul>

      <h4>Daftar Guru:</h4>
      <ul>
        {kelas.guru.length > 0 ? (
          kelas.guru.map((guru) => (
            <li key={guru.id}>{guru.name}</li>
          ))
        ) : (
          <li>Tidak ada guru</li>
        )}
      </ul>
    </div>
  );
};

export default DetailKelas;
