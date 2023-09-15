import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Col, Row, Container} from "react-bootstrap";

function ProductDetails(props) {
    return (
        <>
            <Container>
                <Row className="py-3">
                    <Col md={4}>
                        <Card>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProductDetails;