import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import Notes from "./Notes";

import { useState } from "react";

import { Navbar, Nav } from "react-bootstrap";

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  );
};

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("user1337");
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <p>has {note.important ? "" : "not"} important</p>
    </div>
  );
};

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
    date: "2019-05-30T17:30:31.098Z",
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    important: false,
    date: "2019-05-30T18:39:34.091Z",
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
    date: "2019-05-30T19:20:14.298Z",
  },
];

const App = () => {
  const [user, setUser] = useState(null);

  const padding = {
    padding: 5,
  };

  const noteMatch = useMatch("/notes/:id");
  const note = noteMatch
    ? notes.find((note) => note.id === Number(noteMatch.params.id))
    : null;

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route
          path="/notes/:id"
          element={
            user ? <Note note={note} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/notes"
          element={
            user ? <Notes notes={notes} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <i>Note app, Department of Computer Science 2023</i>
      </footer>
    </div>
  );
};

export default App;
