import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Link from "next/Link";
import Button from "react-bootstrap/Button";

function CustomerSidebar({logout}) {
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h3>Customer Panel</h3></Accordion.Header>
                    <Accordion.Body>
                        <Link className="btn btn-info d-block" href="/customer/order-list">My Order</Link> <hr/>
                        <div className="d-grid">
                            <Button variant="danger" onClick={logout}>Logout</Button> <hr/>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default CustomerSidebar;