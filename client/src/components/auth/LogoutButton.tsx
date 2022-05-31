
import { useAtom } from 'jotai';
import Button from 'react-bootstrap/Button'
import { userState } from '../../state';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface Props {
    className?: string;
}

const LogoutButton: FC<Props> = ({ className }) => {
    const [, setUser] = useAtom(userState);
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        fetch("http://localhost:8080/user/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(undefined);
        navigate('/');
    };

    return (
        <Button variant="secondary" onClick={logout} className={className}>
            Logout
        </Button>
    )
}

export default LogoutButton