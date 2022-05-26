import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { userState } from "../state";
import { useAtom } from "jotai";
import { AuthForm } from "./AuthForm";

export interface User {
  username: string;
}

export const Auth: FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useAtom(userState);

  const getUser = async (): Promise<User | undefined> => {
    const res = await fetch("http://localhost:8080/user", {
      credentials: "include",
    });
    if (res.status === 200) {
      return await res.json();
    }
    return undefined;
  };

  const logout = async (): Promise<void> => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(undefined);
  };

  const register = async (
    username: string,
    password: string
  ): Promise<void> => {
    await fetch("http://localhost:8080/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    setUser(await getUser());
  };

  const login = async (username: string, password: string): Promise<void> => {
    const res: Response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    setUser(await getUser());
  };

  useEffect(() => {
    getUser().then((_user) => setUser(_user));
  }, []);

  return (
    <>
      {user && (
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      )}
      {!user && !isRegistering && (
        <>
          <AuthForm title="Login" onSubmit={login} />
          <Alert variant="secondary">
            <Alert.Heading>Don't have an account?</Alert.Heading>
            <Button
              onClick={() => {
                setIsRegistering(true);
              }}
              variant="outline-success"
            >
              Sign Up
            </Button>
          </Alert>
        </>
      )}
      {!user && isRegistering && (
        <>
          <AuthForm title="Sign Up" onSubmit={register} />{" "}
          <Alert variant="secondary">
            <Alert.Heading>Already have an account?</Alert.Heading>
            <Button
              onClick={() => {
                setIsRegistering(false);
              }}
              variant="outline-success"
            >
              {" "}
              Login
            </Button>
          </Alert>
        </>
      )}
    </>
  );
};
