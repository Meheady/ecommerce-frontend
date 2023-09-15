import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Header from "../website/header";
import Footer from "../website/footer";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import CustomerSidebar from "./customerSidebar";
import {handleLogout} from "../../config/axiosWrapper";
import {toast} from "react-toastify";

function CustomerLayout({children}) {

    const router = useRouter();
    const [isAuthenticate, setAuthenticate] = React.useState(false);


    useEffect(()=>{
        const token = localStorage.getItem('jwtAuth');
        if (!token){
            setAuthenticate(false)
            router.push('/login')
        }
        else{
            setAuthenticate(true);
        }

    },[router.events])


    const logout = () => {
        handleLogout()
            .then((response)=>{
                if (response != null){
                    toast.success(response && response.data.message);
                    localStorage.clear();
                    sessionStorage.clear();
                    router.push('/')
                }
            })
            .catch((error)=>{
                localStorage.clear();
                sessionStorage.clear();
                router.push('/login')
                toast.error(error.message)
            })
    }

    if (!isAuthenticate){
        return null;
    }

    return (
        <>
            <Header logout={logout}/>
            <Container>
                <Row>
                    <Col md={4}>
                        <CustomerSidebar logout={logout}/>
                    </Col>
                    <Col md={8} className="pt-3">
                        {children}
                    </Col>
                </Row>
            </Container>

            <Footer/>
        </>
    );
}

export default CustomerLayout;