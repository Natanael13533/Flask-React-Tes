import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        username,
        password,
      });
      setMessage(response.data.msg);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Gagal mendaftar");
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                <p className="text-white-50 mb-5">
                  Buat akun baru
                </p>
                <form onSubmit={handleRegister}>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>
                </form>
              </div>
              <div>
                <p className="mb-0">
                  Sudah punya akun?{" "}
                  <a href="/login" className="text-white-50 fw-bold">Login</a>
                </p>
              </div>
              {message && (
                <div className="alert alert-info mt-3" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
