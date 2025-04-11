import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar navbar-dark bg-dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/siswa">Siswa</Nav.Link>
            <Nav.Link as={Link} to="/guru">Guru</Nav.Link>
            <Nav.Link as={Link} to="/kelas">Kelas</Nav.Link>
            <Nav.Link as={Link} to="/list/siswa">List Siswa</Nav.Link>
            <Nav.Link as={Link} to="/list/guru">List Guru</Nav.Link>
            <Nav.Link as={Link} to="/all">Semua Data</Nav.Link>
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
