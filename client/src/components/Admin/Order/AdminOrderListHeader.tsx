import React from 'react';
import {Col, Row} from "react-bootstrap";

const AdminOrderListHeader = () => {
    return (
        <>
            <Row>
                <Col className="">Order id</Col>
                <Col>Email</Col>
                <Col className="col-3">Address</Col>
                <Col className="text-center">Country</Col>
                <Col className="text-center">City</Col>
                <Col className="text-center">Status</Col>
                <Col className="text-end">Action</Col>
            </Row>
            <hr/>
        </>
    )
}

export default AdminOrderListHeader;