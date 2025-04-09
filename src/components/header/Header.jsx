// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, Route, Router } from 'react-router-dom';
// import ManageSiswa from '../Siswa';
// import Home from '../Home';

// function Header({ onLogout }) {
//   return (
//     <Router>
//         <div>
//             <Navbar expand="lg" className="bg-body-tertiary">
//                 <Container fluid>
//                     <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
//                     <Navbar.Toggle aria-controls="navbarScroll" />
//                     <Navbar.Collapse id="navbarScroll">
//                     <Nav
//                         className="me-auto my-2 my-lg-0"
//                         style={{ maxHeight: '100px' }}
//                         navbarScroll
//                     >
//                         <Nav.Link as={Link} to="/siswa">Siswa</Nav.Link>
//                         <Nav.Link as={Link} to="/guru">Guru</Nav.Link>
//                         <Nav.Link as={Link} to="/kelas">Kelas</Nav.Link>
//                     </Nav>
//                     <Form className="d-flex">
//                         <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
//                     </Form>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </div>
//         <div>
//             <Switch>
//                 <Route path="/siswa" component={ManageSiswa} />
//                 <Route path="/" component={Home} />
//             </Switch>
//         </div>
//     </Router>
//   );
// }

// export default Header;

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/siswa">Siswa</Nav.Link>
            <Nav.Link as={NavLink} to="/guru">Guru</Nav.Link>
            <Nav.Link as={NavLink} to="/kelas">Kelas</Nav.Link>
            <Nav.Link as={NavLink} to="/list/siswa">List Siswa</Nav.Link>
            <Nav.Link as={NavLink} to="/list/guru">List Guru</Nav.Link>
            <Nav.Link as={NavLink} to="/all">Semua Data</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
