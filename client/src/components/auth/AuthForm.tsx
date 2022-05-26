import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface AuthFormProps {
  title: string;
  onSubmit: (username: string, password: string) => void;
}

export default ({ title, onSubmit }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (username.length <= 0 || password.length <= 0) return;
        onSubmit(username, password);
      }}
    >
      <h1>{title}</h1>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        autoComplete="password"
        aria-describedby="passwordHelpBlock"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="primary">
        {title}
      </Button>
    </Form>
  );
};
