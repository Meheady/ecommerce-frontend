import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/Link";
import {useEffect, useState} from "react";
import {handleLogout} from "../../config/axiosWrapper";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Header = ({logout})=>{

    const [auth,setAuth] = useState(false);
    const [authUser,setAuthUser] = useState({});
    const router = useRouter();

    const user =  localStorage.getItem('user');
    const parseUser = JSON.parse(user);


    useEffect(() => {
        if(parseUser.hasOwnProperty('user_type')){
            setAuth(true);
            setAuthUser(parseUser);
        }
        console.log(parseUser);
    }, []);


    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} href="/">E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mx-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="text-white" as={Link} href="/">HOME</Nav.Link>
                            <Nav.Link className="text-white" as={Link} href="/shopping">SHOPPING</Nav.Link>
                        </Nav>

                        {auth ?
                            <div className="d-flex">
                                <Button variant="success">
                                    <Link style={{color:'white',textDecoration:'none'}} href="/customer">Dashboard</Link>
                                </Button>
                            </div>:<div className="d-flex">
                                <Button variant="outline-success">LOGIN</Button>
                                <Button variant="outline-success">SIGN UP</Button>
                            </div>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;