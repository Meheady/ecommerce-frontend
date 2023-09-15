import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/Link";

const Header = ()=>{

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} href="/">E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mx-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} href="/">HOME</Nav.Link>
                            <Nav.Link as={Link} href="/shopping">SHOPPING</Nav.Link>
                        </Nav>
                        <div className="d-flex">
                            <Button variant="outline-success">LOGIN</Button>
                            <Button variant="outline-success">SIGN UP</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;