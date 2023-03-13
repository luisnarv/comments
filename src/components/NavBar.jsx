import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import img from "../images/logonav.png";

export default function NavBar() {
  const navigate = useNavigate();

  const cartLength = useSelector((state) => state.cart.length);
  const sessionId = useSelector((state) => state.sessionId?.name);
  function handleLogout() {
    navigate("/home");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={img}
            style={{ width: "50px", marginRight: "10px" }}
            alt={img}
          />
          MediLab Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/home">Home</Nav.Link> */}

            {sessionId
              ? null
              : !(
                  <Nav.Link as={Link} to="/signup">
                    {" "}
                  </Nav.Link>
                )}
            {sessionId ? (
              <Nav.Link as={Link} to={`/user`}>
                Mi perfil
              </Nav.Link>
            ) : null}

            <Nav.Link as={Link} to="/cart" href="/cart">
              Cart
              <b style={{ color: "red" }}>{cartLength ? cartLength : null} </b>
            </Nav.Link>

            <Nav>
              <NavDropdown title="Más Información" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/faq">
                  Preguntas Frecuentes
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact">
                  Cantáctanos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about">
                  Acerca de Nosotros
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Nav>

          <Nav>
            {sessionId ? null : (
              <Nav.Link as={Link} to="/signup">
                Sign Up/Login
              </Nav.Link>
            )}

            {sessionId ? (
              <NavDropdown
                title={<span style={{ color: "blue" }}>{sessionId}</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/payments">
                  Pagos
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
