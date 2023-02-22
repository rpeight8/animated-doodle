import ky from "ky";

import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import Input from "./components/Input";
import List from "./components/List";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import webClient from "./components/webClient";
import loginService from "./services/login";
import blogService from "./services/blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newVotes, setNewVotes] = useState(0);
  const [newURL, setNewURL] = useState("");

  const [searchString, setSearchString] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData().catch(console.error);
  }, [user?.token]);

  const onTitleSearch = (event) => {
    setSearchString(event.target.value);
  };

  const onUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const findBlogByTitle = (title) => blogs.find((blog) => title === blog.title);

  const updateOrCreate = async (blog) => blogService.create(blog);

  const onAddClick = async (event) => {
    event.preventDefault();

    try {
      await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newURL,
      });
      setNewTitle("");
      setNewAuthor("");
      setNewURL("");
      setBlogs(await blogService.getAll());
      setError({});
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
      localStorage.setItem("token", loggedUser.token);
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
        <LoginForm
          onLoginPressHandler={onLoginPressClick}
          onPasswordChangeHandler={onPasswordChange}
          onUsernameChangeHandler={onUsernameChange}
          userName={userName}
          password={password}
        />
      )}
      {user !== null && (
        <>
          <h2>Blogs</h2>
          <div>
            <Input
              labelText="search for"
              onEditHandle={onTitleSearch}
              value={searchString}
            />
          </div>
          <h2>add a new</h2>
          <BlogForm
            onAddPressHandler={onAddClick}
            onTitleChangeHandler={setNewTitle}
            onAuthorChangeHandler={setNewAuthor}
            onUrlChangeHandler={setNewURL}
            titleValue={newTitle}
            authorValue={newAuthor}
            urlValue={newURL}
          />
          <h2>Blogs</h2>
          <List
            items={blogs.filter(({ title }) => title.includes(searchString))}
          />
        </>
      )}
    </div>
  );
}

export default App;
