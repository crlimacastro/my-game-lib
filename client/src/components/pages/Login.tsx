import { FC } from "react";
import Alert from "react-bootstrap/esm/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userState } from "../../state";
import AuthForm from "../auth/AuthForm";
import { useAtom } from 'jotai';
import { getUserInSession } from "../../api/session";

const Login: FC = () => {
    const [user, setUser] = useAtom(userState);
    const navigate = useNavigate();

    const login = async (username: string, password: string): Promise<void> => {
        await fetch("http://localhost:8080/user/login", {
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
        setUser(await getUserInSession());
        navigate('/');
    };

    return (

        <>
            {user ?
                // Redirect to home if user in session
                < Navigate to="/" replace={true} /> : <>
                    <AuthForm title="Login" onSubmit={login} className="m-4" /><Alert variant="secondary">
                        <Alert.Heading>Don't have an account?</Alert.Heading>
                        <Link to="/signup">Sign up</Link>
                    </Alert>
                </>}
        </>
    );
};

export default Login;
