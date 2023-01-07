import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Figure, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";
import FigureImage from "react-bootstrap/FigureImage";

const Basket = () => {
    const {basket} = useContext(Context)


    return (
        <Container className="mt-5 p-0">
            <>
            {basket.basket.basket_devices && basket.basket.basket_devices.map((item:BasketDeviceI, index) => {
                return (
                    <Row key={item.device.id}>
                        <Col key={item.device.id}>{++index}</Col>
                        <Col key={item.device.id}>{item.device.name}</Col>
                        <Col key={item.device.id}>
                            <Figure>
                                <FigureImage src={item.device.img} width="50" height="50" />
                            </Figure>
                        </Col>
                        <Col key={item.device.id}>{item.quantity}</Col>
                        <Col key={item.device.id}>{item.device.price}</Col>
                        <Col key={item.device.id}>{item.device.price! * item.quantity}</Col>
                        <Col className="text-end"
                             key={item.device.id}>Remove</Col>
                    </Row>
                )
            })}
                <Row />
            </>
        </Container>
    );
};

export default Basket;