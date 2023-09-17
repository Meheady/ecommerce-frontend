import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import WebsiteLayout from "../layout/website/websiteLayout";
import Card from "react-bootstrap/Card";
import {useEffect, useRef, useState} from "react";
import {customerRegister} from "../service/authService";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import ApiLoader from "../layout/apiLoader";
function Registration(props) {

    const [formData, setFormData] = useState({});
    const [fileData, setFileData] = useState({});
    const [isPublish, setIsPublish] = useState(false);
    const formRef = useRef(null);
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const handleFormData = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }
    const handleReset = () => {
        formRef.current.reset()
        setFormData({})
    }
    const handleSubmit = (event) => {
        event?.preventDefault();

        const confirm  = window.confirm("Are you sure ?")
        if (!confirm) return false;

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
        }
        customerRegister(payload)
                .then((res)=>{
                    toast.success(res.message);
                    router.push('/login')
                })
                .catch((err)=>{
                    toast.error(err.message);
                    handleReset()
                })
                .finally(()=>setLoader(false))

    }
    return (
        <>
            <Container>
                <Row className="py-4">
                    <Col md={6} className="mx-md-auto">
                        <Card>
                            <Card.Body>
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" required name="name" onChange={handleFormData}  placeholder="Enter your name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" required name="email" onChange={handleFormData}  placeholder="Enter your email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" required name="password" onChange={handleFormData}  placeholder="Enter your password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" required name="phone" onChange={handleFormData}  placeholder="Enter your phone number" />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button type="submit" style={{backgroundColor:'#198754',color:'white'}} variant="success">Sign Up Now</Button> <hr/>
                                    </div>
                                </Form>
                            </Card.Body>

                        </Card>

                    </Col>
                </Row>
            </Container>
            {loader && <ApiLoader/>}
        </>
    );
}

export default Registration;
Registration.getLayout = function getLayout(page) {
    return (
        <WebsiteLayout>
            {page}
        </WebsiteLayout>
    )
}