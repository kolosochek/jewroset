import React from 'react';
import {Col, Row} from "react-bootstrap";

const BasketDeviceListHeader = () => {
    return (
        <Row>
            <Col>#</Col>
            <Col className="col-3">Name</Col>
            <Col className="text-center">Img</Col>
            <Col className="text-center">Quantity</Col>
            <Col className="text-center">Price</Col>
            <Col className="text-center">Total</Col>
            <Col className="text-end">Action</Col>
        </Row>
    )
}

export default BasketDeviceListHeader;