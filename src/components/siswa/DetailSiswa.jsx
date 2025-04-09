import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const DetailSiswa = () => {
  const { id } = useParams();
  const siswaId = parseInt(id);
  const [siswa, setSiswa] = useState(null);
  const [kelas, setKelas] = useState(null);
  const [error, setError] = useState("");

  console.log(siswaId);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resSiswa = await api.get(`/siswa/${siswaId}`);
        console.log("Data siswa:", resSiswa.data);
        setSiswa(resSiswa.data);

        const resKelas = await api.get(`/kelas/${resSiswa.data.kelas_id}`);
        setKelas(resKelas.data);
      } 
      catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load data");
        if (error.response) {
            console.log("Error response:", error.response.data);
          }
      }
    };

    fetchDetail();
  }, [siswaId]);

  if (error) return <div>{error}</div>;
  if (!siswa || !kelas) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Detail Siswa</h2>
      <p><strong>Nama:</strong> {siswa.name}</p>
      <p><strong>Kelas:</strong> {kelas.name}</p>
    </div>
  );
};

export default DetailSiswa;