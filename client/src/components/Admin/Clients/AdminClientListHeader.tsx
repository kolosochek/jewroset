import React from 'react';
import {Col, Row} from "react-bootstrap";

const AdminClientListHeader = () => {
    return (
        <Row>
            <Col className="col-1 text-start">User id</Col>
            <Col className="col-3">Email</Col>
            <Col className="col-3 text-center">First name</Col>
            <Col className="text-center">Last name</Col>
            <Col className="text-center">Phone</Col>
            <Col className="text-end col-2">Action</Col>
        </Row>
    )
}

export default AdminClientListHeader;