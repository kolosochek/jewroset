import React from 'react';
import {Col, Row} from "react-bootstrap";

const AdminBrandListHeader = () => {
    return (
        <Row>
            <Col className="text-start">Brand id</Col>
            <Col className="col-3">Name</Col>
            <Col className="text-end col-2">Action</Col>
        </Row>
    )
}

export default AdminBrandListHeader;