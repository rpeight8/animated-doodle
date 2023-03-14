import { Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { LOGIN } from "../../queries";
import { useMutation } from "@apollo/client";
import LibraryContext from "../../LibraryContext";

const LoginForm = () => {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = { username, password };
    login({ variables: user });
  };

  return (
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
  );
};

export default LoginForm;
