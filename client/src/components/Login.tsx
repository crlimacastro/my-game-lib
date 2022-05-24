import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export interface AuthenticationProps {}

export const Authentication: FC = (props: AuthenticationProps) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {
    const res: Response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
      }),
    });

    console.log(res);
  };
  const login = async () => {
    const res: Response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    console.log(res);
  };
  const getUser = async () => {};

  return (
    <>
      <Form>
        <h1>Register</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="register-username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="register-password"
          autoComplete="password"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </Form>
      <Form>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="login-username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="login-password"
          autoComplete="password"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
      <Button variant="primary" onClick={getUser}>
        Get User
      </Button>
    </>
  );
};
