import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const DetailGuru = () => {
  const { id } = useParams();
  const guruId = parseInt(id);
  const [guru, setGuru] = useState(null);
  const [kelas, setKelas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resGuru = await api.get(`/guru/${guruId}`);
        setGuru(resGuru.data);

        const resKelas = await api.get(`/kelas/${resGuru.data.kelas_id}`);
        setKelas(resKelas.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data");
        if (err.response) {
          console.log("Error response:", err.response.data);
        }
      }
    };

    fetchDetail();
  }, [guruId]);

  if (error) return <div>{error}</div>;
  if (!guru || !kelas) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Detail Guru</h2>
      <p><strong>Nama:</strong> {guru.name}</p>
      <p><strong>Kelas:</strong> {kelas.name}</p>
    </div>
  );
};

export default DetailGuru;
