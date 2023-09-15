import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function Footer(props) {
    return (
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <h3>Address</h3>
                        <p className="text-justify"><span className="4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aspernatur blanditiis, commodi, debitis dignissimos dolores earum eius eligendi ex ipsum minima pariatur quos repudiandae sed tenetur ullam veritatis voluptatibus?</span>   </p>
                    </Col>
                    <Col md={4}>
                        <h3>Quick Link</h3>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Order Tracking</li>
                            <li>Special Offer</li>
                        </ul>
                    </Col>
                </Row>
                <p className="text-center">&copy; all right reserve 2023</p>
            </Container>
        </>
    );
}

export default Footer;