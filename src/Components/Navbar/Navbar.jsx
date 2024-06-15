
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AppConstants from '../../Constants';


//function OffcanvasExample() {
  const NavbarOff = ({ username }) => {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">{username===""?AppConstants.title:username}'s Portfolio</Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link>
                  <NavDropdown title="Dropdown" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item href="/suggest">Suggestion</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                    
                    <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarOff;


/* Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppConstants from '../../Constants';
import ColoredLine from '../Line/ColoredLine';

const Navbar = () => {

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" href="/">{AppConstants.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/login">Log In</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/">Action</Link></li>
              <li><Link className="dropdown-item" href="/">Another action</Link></li>
              <li>
              <ColoredLine color="black" />
              </li>
              <li><Link className="dropdown-item" href="/">Something else here</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

    // new Nav bar



    
  );
};

export default Navbar;


 Old Nav Bar
    <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
      <div classNameName="container">
        <Link classNameName="navbar-brand" href="/">{AppConstants.title}</Link>
        <button classNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span classNameName="navbar-toggler-icon"></span>
        </button>
        <div classNameName="collapse navbar-collapse" id="navbarNav">
          <ul classNameName="navbar-nav ml-auto">
            <li classNameName="nav-item">
              <Link classNameName="nav-link" href="/register">Register</Link>
            </li>
            <li classNameName="nav-item">
              <Link classNameName="nav-link" href="/login">Login</Link>
            </li>
            { Add more menu items as needed }
          </ul>
        </div>
      </div>
    </nav>
    */