import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const EditGuru = () => {
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();
  const [guru, setGuru] = useState({ name: "", kelas_id: "" });
  const [kelasList, setKelasList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGuru();
    fetchKelas();
  }, []);

  const fetchGuru = async () => {
    try {
      const response = await api.get(`/guru/${id}`);
      setGuru(response.data);
    } catch (error) {
      console.error("Error fetching guru detail", error);
    }
  };

  const fetchKelas = async () => {
    try {
      const response = await api.get("/kelas");
      setKelasList(response.data);
    } catch (error) {
      console.error("Error fetching kelas", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/guru/${id}`, guru);
      setMessage("Guru berhasil diperbarui");
      navigate("/guru");
    } catch (error) {
      setMessage("Gagal memperbarui guru");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Guru</h2>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Nama Guru:</label>
          <input
            type="text"
            className="form-control"
            value={guru.name}
            onChange={(e) => setGuru({ ...guru, name: e.target.value })}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Pilih Kelas:</label>
          <select
            className="form-control"
            value={guru.kelas_id}
            onChange={(e) => setGuru({ ...guru, kelas_id: e.target.value })}
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Perbarui Guru
        </button>
      </form>
    </div>
  );
};

export default EditGuru;
