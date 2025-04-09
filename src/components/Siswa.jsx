import React, { useEffect, useState } from "react";
import api from "../api";
import ListSiswa from "./siswa/ListSiswa";

function ManageSiswa() {
  const [siswa, setSiswa] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [newSiswa, setNewSiswa] = useState({ name: "", kelas_id: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSiswa();
    fetchKelas();
  }, []);

  const fetchSiswa = async () => {
    try {
      const response = await api.get("/siswa");
      setSiswa(response.data);
    } catch (error) {
      console.error("Error fetching siswa", error);
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

  const handleAddSiswa = async (e) => {
    e.preventDefault();
    try {
      await api.post("/siswa", newSiswa);
      setMessage("Siswa berhasil ditambahkan");
      fetchSiswa();
      // Kosongkan form jika perlu
      setNewSiswa({ name: "", kelas_id: "" });
    } catch (error) {
      setMessage("Gagal menambahkan siswa");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
            <h2>Tambah Siswa</h2>
            <form onSubmit={handleAddSiswa}>
                <div className="mb-3 mt-3">
                    <label className="form-label">Nama Siswa:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Siswa"
                        value={newSiswa.name}
                        onChange={(e) =>
                            setNewSiswa({ ...newSiswa, name: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Pilih Kelas:</label>
                    <select
                        className="form-control"
                        value={newSiswa.kelas_id}
                        onChange={(e) =>
                            setNewSiswa({ ...newSiswa, kelas_id: e.target.value })
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
                <button type="submit" className="btn btn-primary">Tambah Siswa</button>
            </form>
            {message && (
                <div className="alert alert-success mt-3" role="alert">
                    {message}
                </div>
            )}

        </div>
        <div className="col-md-8">
            <ListSiswa siswa={siswa} kelasList={kelasList}/>
        </div>
      </div>
    </div>
  );
}

export default ManageSiswa;