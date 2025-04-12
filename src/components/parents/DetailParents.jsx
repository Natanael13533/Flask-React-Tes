import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const DetailParent = () => {
  const { id } = useParams();
  const parentId = parseInt(id);
  const [parent, setParent] = useState(null);
  const [siswa, setSiswa] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const resParent = await api.get(`/parent/${parentId}`);
        setParent(resParent.data);

        const resSiswa = await api.get(`/siswa/${resParent.data.siswa_id}`);
        setSiswa(resSiswa.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data");
        if (err.response) {
          console.log("Error response:", err.response.data);
        }
      }
    };

    fetchDetail();
  }, [parentId]);

  if (error) return <div>{error}</div>;
  if (!parent || !siswa) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Detail Orang Tua</h2>
      <p><strong>Nama:</strong> {parent.name}</p>
      <p><strong>Siswa:</strong> {siswa.name}</p>
    </div>
  );
};

export default DetailParent;
