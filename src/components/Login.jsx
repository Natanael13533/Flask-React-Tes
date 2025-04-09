import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("access_token", response.data.access_token);
      setMessage("Login berhasil!");
      onLogin();
      navigate("/")
    } catch (error) {
      setMessage("Login gagal! Periksa kembali username dan password");
    }
  };

  return (
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" >
                    <div class="card-body p-5 text-center">
                        <div class="mb-md-5 mt-md-4 pb-5">
                            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                            <p class="text-white-50 mb-5">Masukkan Username dan Password anda!</p>
                            <form onSubmit={handleSubmit}>
                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input type="text" class="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                </div>
                                <div data-mdb-input-init class="form-outline form-white mb-4">
                                    <input type="password" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                            </form>
                        </div>
                        <div>
                            <p class="mb-0">Tidak punya akun? <a href="/register" class="text-white-50 fw-bold">Register</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
