import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance

const KelasGuruViewer = () => {
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelasId, setSelectedKelasId] = useState(null);
  const [guruList, setGuruList] = useState([]);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    try {
      const res = await api.get("/kelas"); // Endpoint: ambil semua kelas
      setKelasList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kelas", error);
    }
  };

  const fetchGuruByKelas = async (kelasId) => {
    try {
      const res = await api.get(`/kelas/${kelasId}/guru`);
      setSelectedKelasId(kelasId);
      setGuruList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data guru", error);
    }
  };

  return (
    <div className="container mt-4">
        <h2>Daftar Guru Berdasarkan Kelas</h2>
        <div className="row">
            <div className="col-md-6">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nama Kelas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelasList.map((kelas) => (
                        <tr key={kelas.id}>
                            <td>{kelas.name}</td>
                            <td>
                                <button
                                className="btn btn-primary"
                                onClick={() => fetchGuruByKelas(kelas.id)}
                                >
                                Lihat Guru
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="col-md-6">
                {selectedKelasId && (
                    <div className="mt-4">
                    <h4>Daftar Guru Kelas: {kelasList.find(k => k.id === selectedKelasId)?.name}</h4>
                    {guruList.length === 0 ? (
                        <p>Tidak ada guru di kelas ini.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nama Guru</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guruList.map((guru) => (
                                <tr key={guru.id}>
                                    <td>{guru.name}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default KelasGuruViewer;
