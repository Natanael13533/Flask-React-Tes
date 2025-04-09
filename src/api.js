import axios from "axios";

const API_URL = "http://localhost:5000/api"; // pastikan sesuai dengan URL backend

// Membuat instance axios
const api = axios.create({
  baseURL: API_URL,
});

// Menambahkan token JWT ke header jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Tambahkan token ke setiap request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
