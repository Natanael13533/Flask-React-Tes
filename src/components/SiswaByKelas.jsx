import React, { useEffect, useState } from "react";
import api from "../api"; // pastikan ini mengarah ke Axios instance kamu

const KelasSiswaViewer = () => {
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelasId, setSelectedKelasId] = useState(null);
  const [siswaList, setSiswaList] = useState([]);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    try {
      const res = await api.get("/kelas");
      setKelasList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kelas", error);
    }
  };

  const fetchSiswaByKelas = async (kelasId) => {
    try {
      const res = await api.get(`/kelas/${kelasId}/siswa`);
      setSelectedKelasId(kelasId);
      setSiswaList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data siswa", error);
    }
  };

  return (
    <div className="container mt-4">
        <h2>Daftar Siswa Berdasarkan Kelas</h2>
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
                                    onClick={() => fetchSiswaByKelas(kelas.id)}
                                    >
                                    Lihat Siswa
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
                    <h4>Daftar Siswa Kelas {kelasList.find(k => k.id === selectedKelasId)?.name}</h4>
                    {siswaList.length === 0 ? (
                        <p>Tidak ada siswa dalam kelas ini.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nama Siswa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siswaList.map((siswa) => (
                                <tr key={siswa.id}>
                                    <td>{siswa.name}</td>
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

export default KelasSiswaViewer;
