import React from 'react';
import {Col, Row} from "react-bootstrap";

const AdminClientListHeader = () => {
    return (
        <Row>
            <Col className="col-1 text-start">User id</Col>
            <Col className="col-5">Email</Col>
            <Col className="text-center">First name</Col>
            <Col className="text-center">Last name</Col>
            <Col className="text-center">Role</Col>
            <Col className="text-center col-2">Phone</Col>
            <Col className="text-end col-1">Action</Col>
        </Row>
    )
}

export default AdminClientListHeader;