import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const EditKelas = () => {
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();
  const [kelas, setKelas] = useState({ name: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", kelas_id: "" });

  useEffect(() => {
    fetchKelas();
  }, []);

  // Ambil data kelas berdasarkan id
  const fetchKelas = async () => {
    try {
      const response = await api.get(`/kelas/${id}`);
      setKelas(response.data);
    } catch (error) {
      console.error("Error fetching kelas detail", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let hasError = false;
    const newErrors = { name: "", kelas_id: "" };
  
    if (!kelas.name.trim()) {
      newErrors.name = "Kelas wajib diisi.";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    // clear errors
    setErrors({ kelas_id: "" });

    try {
      await api.put(`/kelas/${id}`, kelas);
      setMessage("Kelas berhasil diperbarui");
      navigate("/kelas");
    } catch (error) {
      setMessage("Gagal memperbarui kelas");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Kelas</h2>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Nama Kelas:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={kelas.name}
            onChange={(e) => setKelas({ ...kelas, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Perbarui Kelas
        </button>
      </form>
    </div>
  );
};

export default EditKelas;
