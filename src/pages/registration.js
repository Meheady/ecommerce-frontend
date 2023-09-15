import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import WebsiteLayout from "../layout/website/websiteLayout";
import Card from "react-bootstrap/Card";

function Registration(props) {
    return (
        <>
            <Container>
                <Row className="py-4">
                    <Col md={6} className="mx-md-auto">
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Enter your name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter your email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" name="phone" placeholder="Enter your phone number" />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button style={{backgroundColor:'#198754',color:'white'}} variant="success">Sign Up Now</Button> <hr/>
                                    </div>
                                </Form>
                            </Card.Body>

                        </Card>

                    </Col>
                </Row>
            </Container>
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