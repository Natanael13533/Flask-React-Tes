import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const EditSiswa = () => {
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState({ name: "", kelas_id: "" });
  const [kelasList, setKelasList] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", kelas_id: "" });

  useEffect(() => {
    fetchSiswa();
    fetchKelas();
  }, []);

  // Ambil data siswa berdasarkan id
  const fetchSiswa = async () => {
    try {
      const response = await api.get(`/siswa/${id}`);
      setSiswa(response.data);
    } catch (error) {
      console.error("Error fetching siswa detail", error);
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

    // Validation
    let hasError = false;
    const newErrors = { name: "", kelas_id: "" };
  
    if (!siswa.name.trim()) {
      newErrors.name = "Siswa wajib diisi.";
      hasError = true;
    }
  
    if (!siswa.kelas_id) {
      newErrors.kelas_id = "Kelas wajib dipilih.";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    // clear errors
    setErrors({ name: "", kelas_id: "" });

    try {
      await api.put(`/siswa/${id}`, siswa);
      setMessage("Siswa berhasil diperbarui");
      // Redirect ke halaman list atau detail siswa setelah update
      navigate("/siswa");
    } catch (error) {
      setMessage("Gagal memperbarui siswa");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Siswa</h2>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Nama Siswa:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={siswa.name}
            onChange={(e) => setSiswa({ ...siswa, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Pilih Kelas:</label>
          <select
            className={`form-control ${errors.kelas_id ? "is-invalid" : ""}`}
            value={siswa.kelas_id}
            onChange={(e) => setSiswa({ ...siswa, kelas_id: e.target.value })}
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.name}
              </option>
            ))}
          </select>
          {errors.kelas_id && <div className="invalid-feedback">{errors.kelas_id}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Perbarui Siswa
        </button>
      </form>
    </div>
  );
};

export default EditSiswa;
