import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Figure, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";
import FigureImage from "react-bootstrap/FigureImage";
import EmptyBasket from "../components/EmptyBasket";
import AddToCart from "../components/AddToCart";

const Basket = () => {
    const {basket} = useContext(Context)


    return (
        <Container className="mt-5 p-0">
            {basket.basket.basket_devices!.length !== 0
                && <>
                    <Row>
                        <Col>#</Col>
                        <Col>Name</Col>
                        <Col className="text-center">Img</Col>
                        <Col className="text-center">Quantity</Col>
                        <Col className="text-center">Price</Col>
                        <Col className="text-center">Total</Col>
                        <Col className="text-end">Action</Col>
                    </Row>
                    <hr/>
                </>}
            {basket.basket.basket_devices! && basket.basket.basket_devices!.map((item: BasketDeviceI, index) => {
                    return (
                        <Row key={item.device.id}>
                            <Col key={item.device.id}>{++index}</Col>
                            <Col className="align-content-center" key={item.device.id}>{item.device.name}</Col>
                            <Col className="text-center" key={item.device.id}>
                                <Figure>
                                    <FigureImage
                                        src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${item.device.img}`}
                                        width="30" height="30"/>
                                </Figure>
                            </Col>
                            <Col className="text-center" key={item.device.id}>{item.quantity}<AddToCart device={item.device}
                                                                                         quantity={item.quantity}/></Col>
                            <Col className="text-center" key={item.device.id}>{item.device.price}</Col>
                            <Col className="text-center"
                                 key={item.device.id}>{item.device.price! * item.quantity}</Col>
                            <Col className="text-end bi bi-x-circle"
                                 key={item.device.id}></Col>
                        </Row>
                    )
                })
            }
            {basket.basket.basket_devices?.length == 0 &&  <EmptyBasket/>}
        </Container>
    );
};

export default Basket;