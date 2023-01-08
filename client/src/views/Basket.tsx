import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Figure, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";
import FigureImage from "react-bootstrap/FigureImage";
import EmptyBasket from "../components/EmptyBasket";
import AddToCart from "../components/AddToCart";
import {observer} from "mobx-react-lite";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const isBasketEmpty = basket.basketDevices?.length === 0
    let priceTotal = 0
    for (let item of basket.basketDevices!){
        priceTotal += item.quantity * item.device.price!
    }


    return (
        <Container className="mt-5 p-0">
            {!isBasketEmpty
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
            {!isBasketEmpty && basket.basket.basket_devices?.map((item: Partial<BasketDeviceI>, index) => {
                return (
                    <Row key={item.device?.id}>
                        <Col>{++index}</Col>
                        <Col className="align-content-center">{item.device?.name}</Col>
                        <Col className="text-center">
                            <Figure>
                                <FigureImage
                                    src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${item.device?.img}`}
                                    width="30" height="30"/>
                            </Figure>
                        </Col>
                        <Col className="text-center"><AddToCart device={item?.device}
                                                                               quantity={item.quantity}/></Col>
                        <Col className="text-center">{item.device?.price}</Col>
                        <Col className="text-center">{item.device?.price! * item.quantity!}</Col>
                        <Col
                            className="text-end bi bi-x-circle"
                            onClick={() => {
                                // debug
                                console.log('gotcha')
                                //
                                basket.removeBasketDevice(item.device?.id!)
                            }}
                        ></Col>
                    </Row>
                )
            })
            }
            {!isBasketEmpty
                && <>
                    <hr/>
                    <Row>
                        <Col className="text-end">{`Price total: ${priceTotal}`}</Col>
                    </Row>
                </>}
            {isBasketEmpty && <EmptyBasket/>}
        </Container>
    )
})

export default Basket;