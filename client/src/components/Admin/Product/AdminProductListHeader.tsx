import React from 'react';
import {Col, Row} from "react-bootstrap";

const AdminProductListHeader = () => {
    return (
        <>
            <Row>
                <Col className="col-1 text-start">Device id</Col>
                <Col className="col-3">Name</Col>
                <Col className="col-3 text-center">Description</Col>
                <Col className="text-center">Img</Col>
                <Col className="text-center">Price</Col>
                <Col className="text-end col-2">Action</Col>
            </Row>
            <hr/>
        </>
    )
}

export default AdminProductListHeader;