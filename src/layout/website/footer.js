import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function Footer(props) {
    return (
        <>
            <Container>
                <Row className="py-1 bg-dark">
                    <Col md={12}>
                        <h5 className="text-center text-white">&copy; all right reserve 2023</h5>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default Footer;