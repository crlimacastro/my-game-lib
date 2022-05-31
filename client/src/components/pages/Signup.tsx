import { FC } from "react";
import Alert from "react-bootstrap/esm/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userState } from "../../state";
import AuthForm from "../auth/AuthForm";
import { useAtom } from 'jotai';
import { getUserInSession } from "../../api/session";

const Signup: FC = () => {
    const [user, setUser] = useAtom(userState);
    const navigate = useNavigate();

    const register = async (
        username: string,
        password: string
    ): Promise<void> => {
        await fetch("http://localhost:8080/user/register", {
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
            {user ? <Navigate to="/" replace={true} /> : <>
                <AuthForm title="Sign Up" onSubmit={register} className="m-4" />
                <Alert variant="secondary">
                    <Alert.Heading>Already have an account?</Alert.Heading>
                    <Link to="/login">Login</Link>
                </Alert>
            </>}

        </>
    );
};

export default Signup;
