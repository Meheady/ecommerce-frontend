import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import WebsiteLayout from "../layout/website/websiteLayout";

const NotFoundPage = () => {
    return (
        <Container className="mt-5">
            <Row className="py-5">
                <Col className="text-center">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link href="/products">
                        <Button className="mt-3" variant="primary">Back Dashboard</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <WebsiteLayout>
            {page}
        </WebsiteLayout>
    )
}