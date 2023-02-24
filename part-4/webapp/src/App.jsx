import ky from "ky";

import { useEffect, useState, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Input from "./components/Input";
import BlogList from "./components/BlogList";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Tooglable from "./components/Tooglable";
import { setToken } from "./services/webClient";

import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  const [searchString, setSearchString] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});

  const requestNumber = useRef(0);

  const loggedUserJSON = window.localStorage.getItem("user");
  if (loggedUserJSON && !user) {
    const loggedUser = JSON.parse(loggedUserJSON);
    setUser(loggedUser);
    setToken(loggedUser.token);
  }

  const getAndDisplayBlogs = async () => {
    requestNumber.current += 1;
    const currentRequestNumber = requestNumber.current;
    const data = await blogService.getAll();

    if (currentRequestNumber !== requestNumber.current) {
      return;
    }
    data.sort((a, b) => b.votes - a.votes);
    setBlogs(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }
        getAndDisplayBlogs();
      } catch (err) {
        setError(err);
      }
    };

    fetchData().catch(console.error);
  }, [user, user?.token]);

  const onTitleSearch = (event) => {
    setSearchString(event.target.value);
  };

  const onUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const blogFormRef = useRef();

  const onAddClick = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility();
      await blogService.create({
        title,
        author,
        url,
      });
      getAndDisplayBlogs();
    } catch (err) {
      if (err.name === "HTTPError") {
        const errorJson = await err.response.json();
        setError(errorJson);
      }
    }
  };

  const handleVote = async (blog, isAdd) => {
    try {
      if (isAdd) await blogService.addVote(blog.id);
      else await blogService.removeVote(blog.id);

      getAndDisplayBlogs();
    } catch (err) {
      if (err.name === "HTTPError") {
        const errorJson = await err.response.json();
        setError(errorJson);
      }
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id);
      getAndDisplayBlogs();
    } catch (err) {
      if (err.name === "HTTPError") {
        const errorJson = await err.response.json();
        setError(errorJson);
      }
    }
  };

  const onLoginPressClick = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ userName, password });
      setUser(loggedUser);
      setUserName("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setToken(loggedUser.token);
    } catch (err) {
      if (err.name === "HTTPError") {
        const errorJson = await err.response.json();
        setError(errorJson);
        setUserName("");
        setPassword("");
      }
    }
  };

  return (
    <div>
      {error.message && <Error error={error} />}
      {user === null && (
        <Tooglable buttonLabel="login">
          <LoginForm
            onLoginPressHandler={onLoginPressClick}
            onPasswordChangeHandler={onPasswordChange}
            onUsernameChangeHandler={onUsernameChange}
            userName={userName}
            password={password}
          />
        </Tooglable>
      )}
      {user !== null && (
        <>
          <button
            type="button"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
            }}
          >
            logout
          </button>

          <h2>Blogs</h2>
          <div>
            <Input
              labelText="search for"
              onEditHandle={onTitleSearch}
              value={searchString}
            />
          </div>
          <h2>add a new</h2>
          <Tooglable buttonLabel="Add blog" ref={blogFormRef}>
            <BlogForm onAddPressHandler={onAddClick} />
          </Tooglable>
          <h2>Blogs</h2>
          <BlogList
            items={blogs.filter(({ title }) => title.includes(searchString))}
            handleVote={handleVote}
            handleDelete={handleDelete}
            currentUser={user}
          />
        </>
      )}
    </div>
  );
}

export default App;
