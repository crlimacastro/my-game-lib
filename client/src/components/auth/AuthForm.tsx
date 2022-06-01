import { FC, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface Props {
  className?: string;
  title: string;
  onSubmit: (username: string, password: string) => void;
}

/**
 * Reusable Authentication Form component.
 * In props, define what appears on the form with title
 * and what happens onSubmit.
 */
const AuthForm: FC<Props> = ({ title, onSubmit, className }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form className={className}
      onSubmit={(e) => {
        e.preventDefault();
        if (username.length <= 0 || password.length <= 0) return;
        onSubmit(username, password);
      }}
    >
      <h1>{title}</h1>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          autoComplete="password"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="my-2">
        {title}
      </Button>
    </Form>
  );
};

export default AuthForm;