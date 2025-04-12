import React, { useEffect, useState } from "react";
import api from "../api";
import ListParents from "./parents/ListParents";

function ManageParents() {
  const [parent, setParents] = useState([]);
  const [siswaList, setSiswaList] = useState([]);
  const [newParent, setNewParent] = useState({ name: "", siswa_id: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", siswa_id: "" });

  useEffect(() => {
    fetchParents();
    fetchSiswa();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await api.get("/parents");
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching Parents", error);
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

  const handleAddParents = async (e) => {
    e.preventDefault();

     // Validation
     let hasError = false;
     const newErrors = { name: "", siswa_id: "" };
   
     if (!newParent.name.trim()) {
       newErrors.name = "Orang Tua wajib diisi.";
       hasError = true;
     }
   
     if (!newParent.siswa_id) {
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
      await api.post("/parent", newParent);
      setMessage("Guru berhasil ditambahkan");
      fetchParents();
      setNewParent({ name: "", siswa_id: "" });
    } catch (error) {
      setMessage("Gagal menambahkan Orang Tua");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
            <h2>Tambah Orang Tua Murid</h2>
            <form onSubmit={handleAddParents}>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nama Orang Tua:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Nama Orang Tua"
                        value={newParent.name}
                        onChange={(e) =>
                            setNewParent({ ...newParent, name: e.target.value })
                        }
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Pilih Siswa:</label>
                    <select
                        className={`form-control ${errors.siswa_id ? "is-invalid" : ""}`}
                        value={newParent.siswa_id}
                        onChange={(e) =>
                            setNewParent({ ...newParent, siswa_id: e.target.value })
                        }
                    >
                        <option value="">-- Pilih Siswa --</option>
                        {siswaList.map((siswa) => (
                            <option key={siswa.id} value={siswa.id}>
                                {siswa.name}
                            </option>
                        ))}
                    </select>
                    {errors.siswa_id && <div className="invalid-feedback">{errors.siswa_id}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Tambah Guru</button>
            </form>
            {message && (
                <div className="alert alert-success mt-3" role="alert">
                    {message}
                </div>
            )}
        </div>
        <div className="col-md-8">
            <ListParents parent={parent} siswaList={siswaList} />
        </div>
      </div>
    </div>
  );
}

export default ManageParents;
