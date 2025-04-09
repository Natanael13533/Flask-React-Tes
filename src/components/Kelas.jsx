import React, { useEffect, useState } from "react";
import api from "../api";
import ListKelas from "./kelas/Listkelas";

function ManageKelas() {
  const [kelas, setKelas] = useState([]);
  const [newKelas, setNewKelas] = useState({ name: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    try {
      const response = await api.get("/kelas");
      setKelas(response.data);
    } catch (error) {
      console.error("Error fetching kelas", error);
    }
  };

  const handleAddKelas = async (e) => {
    e.preventDefault();
    try {
      await api.post("/kelas", newKelas);
      setMessage("Kelas berhasil ditambahkan");
      setNewKelas({ name: "" });
      fetchKelas();
    } catch (error) {
      setMessage("Gagal menambahkan kelas");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2>Tambah Kelas</h2>
          <form onSubmit={handleAddKelas}>
            <div className="mb-3">
              <label className="form-label">Nama Kelas:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nama Kelas"
                value={newKelas.name}
                onChange={(e) => setNewKelas({ name: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Tambah Kelas</button>
          </form>
          {message && (
            <div className="alert alert-success mt-3" role="alert">
              {message}
            </div>
          )}
        </div>
        <div className="col-md-8">
          <ListKelas kelas={kelas} />
        </div>
      </div>
    </div>
  );
}

export default ManageKelas;
