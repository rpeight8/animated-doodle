import { Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { LOGIN } from "../../queries";
import { useMutation, useApolloClient } from "@apollo/client";
import { AuthContext } from "../../providers/AuthProvider";
import { NotificationContext } from "../../providers/NotificationProvider";

const LoginForm = () => {
  const client = useApolloClient();
  const { user, setUser } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification({
        message: error.message ? error.message : error.graphQLErrors[0].message,
        type: "danger",
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      setUser({
        username,
        token,
      });
      setNotification({
        message: `Welcome ${username}`,
        type: "success",
      });
      client.resetStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const onSubmit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setNotification({
      message: "Logged out",
      type: "success",
    });
  };

  console.log("LoginForm: render");
  return (
    <>
      {(user && user.username && (
        <>
          {" "}
          <div>{user.username} logged in</div>{" "}
          <Button variant="primary" type="submit" onClick={onLogout}>
            Logout
          </Button>
        </>
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
            Login
          </Button>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
