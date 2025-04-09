import React, { useEffect, useState } from "react";
import api from "../api";
import ListGuru from "./guru/ListGuru";

function ManageGuru() {
  const [guru, setGuru] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [newGuru, setNewGuru] = useState({ name: "", kelas_id: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGuru();
    fetchKelas();
  }, []);

  const fetchGuru = async () => {
    try {
      const response = await api.get("/guru");
      setGuru(response.data);
    } catch (error) {
      console.error("Error fetching guru", error);
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

  const handleAddGuru = async (e) => {
    e.preventDefault();
    try {
      await api.post("/guru", newGuru);
      setMessage("Guru berhasil ditambahkan");
      fetchGuru();
      setNewGuru({ name: "", kelas_id: "" });
    } catch (error) {
      setMessage("Gagal menambahkan guru");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
            <h2>Tambah Guru</h2>
            <form onSubmit={handleAddGuru}>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nama Guru:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Guru"
                        value={newGuru.name}
                        onChange={(e) =>
                            setNewGuru({ ...newGuru, name: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Pilih Kelas:</label>
                    <select
                        className="form-control"
                        value={newGuru.kelas_id}
                        onChange={(e) =>
                            setNewGuru({ ...newGuru, kelas_id: e.target.value })
                        }
                    >
                        <option value="">-- Pilih Kelas --</option>
                        {kelasList.map((kelas) => (
                            <option key={kelas.id} value={kelas.id}>
                                {kelas.name}
                            </option>
                        ))}
                    </select>
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
            <ListGuru guru={guru} kelasList={kelasList} />
        </div>
      </div>
    </div>
  );
}

export default ManageGuru;
