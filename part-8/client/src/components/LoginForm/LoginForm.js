import { Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { LOGIN } from "../../queries";
import { useMutation, useApolloClient } from "@apollo/client";
import LibraryContext from "../../LibraryContext";

const LoginForm = () => {
  const client = useApolloClient();
  const [state, dispatch] = useContext(LibraryContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      dispatch({ type: "SET_ERROR", payload: error.graphQLErrors[0].message });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      dispatch({ type: "SET_TOKEN", payload: token });
      localStorage.setItem("token", token);
      client.resetStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const logout = () => {
    dispatch({ type: "SET_TOKEN", payload: "" });
    localStorage.removeItem("token");
    client.resetStore();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = { username, password };
    login({ variables: user });
  };

  return (
    <>
      {(state.token && (
        <div>
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      )) || (
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
