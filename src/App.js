import React, { useState } from "react";
import Login from "./components/Login";
import ManageSiswa from "./components/Siswa";
import DetailSiswa from "./components/siswa/DetailSiswa"
import EditSiswa from "./components/siswa/EditSiswa";
import Header from "./components/header/Header";
import { Switch, Route, Routes, BrowserRouter as Router, useLocation, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import ManageKelas from "./components/Kelas";
import EditKelas from "./components/kelas/EditKelas";
import DetailKelas from "./components/kelas/DetailKelas";
import ManageGuru from "./components/Guru";
import DetailGuru from "./components/guru/DetailGuru";
import EditGuru from "./components/guru/EditGuru";
import SiswaByKelas from "./components/SiswaByKelas";
import GuruByKelas from "./components/GuruByKelas";
import AllData from "./components/AllData";
import Register from "./components/Register";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PublicRoute";
// import ManageKelas dan ManageGuru sesuai kebutuhan

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {/* {!shouldHideHeader && isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<h1>Welcome to Dashboard</h1>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/siswa" element={<PrivateRoute><ManageSiswa /></PrivateRoute>} />
        <Route path="/siswa/edit/:id" element={<PrivateRoute><EditSiswa /></PrivateRoute>} />
        <Route path="/siswa/detail/:id" element={<PrivateRoute><DetailSiswa /></PrivateRoute>} /> 
        <Route path="/kelas" element={<PrivateRoute><ManageKelas /></PrivateRoute>} />
        <Route path="/kelas/edit/:id" element={<PrivateRoute><EditKelas /></PrivateRoute>} />
        <Route path="/kelas/detail/:id" element={<PrivateRoute><DetailKelas /></PrivateRoute>} /> 
        <Route path="/guru" element={<PrivateRoute><ManageGuru /></PrivateRoute>} />
        <Route path="/guru/edit/:id" element={<PrivateRoute><EditGuru /></PrivateRoute>} />
        <Route path="/guru/detail/:id" element={<PrivateRoute><DetailGuru /></PrivateRoute>} />
        <Route path="/list/siswa" element={<PrivateRoute><SiswaByKelas /></PrivateRoute>} />
        <Route path="/list/guru" element={<PrivateRoute><GuruByKelas /></PrivateRoute>} />
        <Route path="/all" element={<PrivateRoute><AllData /></PrivateRoute>} />
      </Routes> */}
      <AppContent 
        isLoggedIn={loggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </div>
  );
};

const AppContent = ({isLoggedIn, handleLogin, handleLogout}) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", '/register']
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        
        <Route path="/login" element={<PublicRoute><Login onLogin={handleLogin} /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><h1>Welcome to Dashboard</h1></PrivateRoute>} />
        <Route path="/siswa" element={<PrivateRoute><ManageSiswa /></PrivateRoute>} />
        <Route path="/siswa/edit/:id" element={<PrivateRoute><EditSiswa /></PrivateRoute>} />
        <Route path="/siswa/detail/:id" element={<PrivateRoute><DetailSiswa /></PrivateRoute>} /> 
        <Route path="/kelas" element={<PrivateRoute><ManageKelas /></PrivateRoute>} />
        <Route path="/kelas/edit/:id" element={<PrivateRoute><EditKelas /></PrivateRoute>} />
        <Route path="/kelas/detail/:id" element={<PrivateRoute><DetailKelas /></PrivateRoute>} /> 
        <Route path="/guru" element={<PrivateRoute><ManageGuru /></PrivateRoute>} />
        <Route path="/guru/edit/:id" element={<PrivateRoute><EditGuru /></PrivateRoute>} />
        <Route path="/guru/detail/:id" element={<PrivateRoute><DetailGuru /></PrivateRoute>} />
        <Route path="/list/siswa" element={<PrivateRoute><SiswaByKelas /></PrivateRoute>} />
        <Route path="/list/guru" element={<PrivateRoute><GuruByKelas /></PrivateRoute>} />
        <Route path="/all" element={<PrivateRoute><AllData /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
