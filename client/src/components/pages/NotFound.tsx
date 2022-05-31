import { FC } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <>
      <Container fluid>
        <h1>Page Not Found</h1>
        <p>Navigate back to <Link to={'/'}>Home</Link></p>
      </Container>
    </>
  );
};

export default NotFound;
