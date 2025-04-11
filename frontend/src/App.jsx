import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import ManageSiswa from './pages/siswa/Siswa';
import EditSiswa from './pages/siswa/EditSiswa';
import DetailSiswa from './pages/siswa/DetailSiswa';
import ManageKelas from './pages/kelas/Kelas';
import EditKelas from './pages/kelas/EditKelas';
import DetailKelas from './pages/kelas/DetailKelas'
import ManageGuru from './pages/guru/Guru';
import EditGuru from './pages/guru/EditGuru';
import DetailGuru from './pages/guru/DetailGuru';
import SiswaByKelas from './pages/SiswaByKelas';
import GuruByKelas from './pages/GuruByKelas';
import AllData from './pages/AllData';
import PrivateRoute from './components/route/PrivateRoute';
import PublicRoute from './components/route/PublicRoute';

const Dashboard = ({ handleLogout }) => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];
  const shouldHideNavbar = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Header onLogout={handleLogout} />}
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('access_token')
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard handleLogout={handleLogout} />,
      children: [
        {
          path: '/',
          element: <PrivateRoute><h1>Welcome to Dashboard</h1></PrivateRoute>,
        },
        {
          path: '/about',
          element: <PrivateRoute><About /></PrivateRoute>,
        },
        {
          path: '/siswa',
          element: <PrivateRoute><ManageSiswa /></PrivateRoute>,
        },
        {
          path: '/siswa/edit/:id',
          element: <PrivateRoute><EditSiswa /></PrivateRoute>,
        },
        {
          path: '/siswa/detail/:id',
          element: <PrivateRoute><DetailSiswa /></PrivateRoute>,
        },
        {
          path: '/kelas',
          element: <PrivateRoute><ManageKelas /></PrivateRoute>,
        },
        {
          path: '/kelas/edit/:id',
          element: <PrivateRoute><EditKelas /></PrivateRoute>,
        },
        {
          path: '/kelas/detail/:id',
          element: <PrivateRoute><DetailKelas /></PrivateRoute>,
        },
        {
          path: '/guru',
          element: <PrivateRoute><ManageGuru /></PrivateRoute>,
        },
        {
          path: '/guru/edit/:id',
          element: <PrivateRoute><EditGuru /></PrivateRoute>,
        },
        {
          path: '/guru/detail/:id',
          element: <PrivateRoute><DetailGuru /></PrivateRoute>,
        },
        {
          path: '/list/siswa',
          element: <PrivateRoute><SiswaByKelas /></PrivateRoute>,
        },
        {
          path: '/list/guru',
          element: <PrivateRoute><GuruByKelas /></PrivateRoute>,
        },
        {
          path: '/all',
          element: <PrivateRoute><AllData /></PrivateRoute>,
        },
        {
          path: '*',
          element: <PrivateRoute><NotFound /></PrivateRoute>,
        },
      ],
    },
    {
      path: '/login',
      element: <PublicRoute><Login onLogin={handleLogin} /></PublicRoute>,
    },
    {
      path: '/register',
      element: <PublicRoute><Register /></PublicRoute>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} key={loggedIn ? 'auth' : 'guest'}/>
    </div>
  );
}

export default App;
