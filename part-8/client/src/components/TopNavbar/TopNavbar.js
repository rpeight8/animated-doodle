import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

function TopNavbar() {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Library
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/books">
            Books
          </Nav.Link>
          <Nav.Link as={Link} to="/authors">
            Authors
          </Nav.Link>
          <Nav.Link as={Link} to="/auth">
            Auth
          </Nav.Link>
          {user && (
            <Nav.Link as={Link} to="/ownedBooks">
              My books
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNavbar;
