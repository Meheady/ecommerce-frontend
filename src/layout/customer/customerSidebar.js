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
                        <Link className="btn btn-info d-block" href="my-order">My Order</Link> <hr/>
                        <Link as={Button} className="btn btn-danger d-block" onClick={logout} href="#">Logout</Link> <hr/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default CustomerSidebar;