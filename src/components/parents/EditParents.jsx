import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const EditParent = () => {
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();
  const [parent, setParent] = useState({ name: "", siswa_id: "" });
  const [siswaList, setSiswaList] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", siswa_id: "" });

  useEffect(() => {
    fetchParent();
    fetchSiswa();
  }, []);

  const fetchParent = async () => {
    try {
      const response = await api.get(`/parent/${id}`);
      setParent(response.data);
    } catch (error) {
      console.error("Error fetching guru detail", error);
    }
  };

  const fetchSiswa = async () => {
    try {
      const response = await api.get("/siswa");
      setSiswaList(response.data);
    } catch (error) {
      console.error("Error fetching kelas", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let hasError = false;
    const newErrors = { name: "", siswa_id: "" };
  
    if (!parent.name.trim()) {
      newErrors.name = "Orang Tua wajib diisi.";
      hasError = true;
    }
  
    if (!parent.siswa_id) {
      newErrors.siswa_id = "Siswa wajib dipilih.";
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return;
    }
  
    // clear errors
    setErrors({ name: "", siswa_id: "" });

    try {
      await api.put(`/parent/${id}`, parent);
      setMessage("parent berhasil diperbarui");
      navigate("/parents");
    } catch (error) {
      setMessage("Gagal memperbarui Orang Tua");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Orang Tua</h2>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Nama Orang Tua:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={parent.name}
            onChange={(e) => setParent({ ...parent, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Pilih Siswa:</label>
          <select
            className={`form-control ${errors.siswa_id ? "is-invalid" : ""}`}
            value={parent.siswa_id}
            onChange={(e) => setParent({ ...parent, siswa_id: e.target.value })}
          >
            <option value="">-- Pilih siswa --</option>
            {siswaList.map((siswa) => (
              <option key={siswa.id} value={siswa.id}>
                {siswa.name}
              </option>
            ))}
          </select>
          {errors.siswa_id && <div className="invalid-feedback">{errors.siswa_id}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Perbarui Orang Tua
        </button>
      </form>
    </div>
  );
};

export default EditParent;
