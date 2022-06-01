import { useAtom } from "jotai";
import { FC } from "react";
import { Controller } from "react-bootstrap-icons";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import Offcanvas from "react-bootstrap/esm/Offcanvas";
import { Link } from "react-router-dom";
import { userState } from "../state";
import LogoutButton from "./auth/LogoutButton";

/**
 * Reusable Header component with logo, navbar, and logout button
 */
const Header: FC = () => {
    const [user] = useAtom(userState);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand={'sm'} className="mb-4">
                <Container fluid>
                    <Link to="/" className="navbar-brand"><Controller size={32} /> My Game Lib</Link>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-'sm'-${'sm'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-'sm'-${'sm'}`}
                        aria-labelledby={`offcanvasNavbarLabel-'sm'-${'sm'}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-'sm'-${'sm'}`}>
                                My Game Lib
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                <Link to="/" className="nav-link">Home</Link>
                                <Link to="/favorites" className="nav-link">Favorites</Link>
                            </Nav>
                            {user && <>
                                <Navbar.Text className="ms-auto me-2">Hello {user!.username}! </Navbar.Text>
                                <LogoutButton />
                            </>
                            }
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar >
        </>
    );
}
export default Header;