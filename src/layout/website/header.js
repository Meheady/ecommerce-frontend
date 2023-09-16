import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/Link";
import {useEffect, useState} from "react";
import Badge from 'react-bootstrap/Badge';
import {useRouter} from "next/router";
import {customerCart} from "../../service/customer/cartService";
import {useUserStore} from "../../store/userStore";
import {toast} from "react-toastify";

const Header = ()=>{

    const [auth,setAuth] = useState(false);
    const [authUser,setAuthUser] = useState({});
    const user = useUserStore((state)=>state.user);
    const [cartTotal, setCartTotal] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(user && user.hasOwnProperty('user_type')){
            setAuth(true);
            setAuthUser(user);
        }
    }, []);


    useEffect(()=>{
        fetchCartTotal()
            .then((res)=>{
                if (res != null ){
                    let total  = 0;
                    res.map((item, index)=>{
                        total +=item.quantity;
                    });
                    setCartTotal(total);
                }
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    },[auth])

    const goLogin = () => {
      router.push('/login');
    }
    const goRegistration = () => {
      router.push('/registration');
    }
    const goCartList = () => {
      router.push('/customer/cart-list');
    }


    console.log("heder");

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
                            <Nav.Link className="text-white" as={Link} href="/products">SHOPPING</Nav.Link>
                        </Nav>

                        {auth ?
                            <div className="d-flex">
                                <Button onClick={goCartList} className="me-2" variant="light">
                                    My Cart <Badge bg="secondary">{cartTotal && cartTotal}</Badge>
                                </Button>
                                <Button  variant="success">
                                    <Link style={{color:'white',textDecoration:'none'}} href="/customer">Dashboard</Link>
                                </Button>
                            </div>:<div className="d-flex">
                                <Button onClick={goLogin} className="me-2" variant="success">LOGIN</Button>
                                <Button onClick={goRegistration} variant="secondary">SIGN UP</Button>
                            </div>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;

export const fetchCartTotal = async () => {
   return  await customerCart()
        .then((res)=>{
            return res.data;
        })
        .catch((err)=>{
            return err;
        })
}
