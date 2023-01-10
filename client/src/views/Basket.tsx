import React, {useContext} from 'react';
import {Button, Col, Container, Figure, Row} from "react-bootstrap";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";
import FigureImage from "react-bootstrap/FigureImage";
import EmptyBasket from "../components/EmptyBasket";
import AddToCart from "../components/AddToCart/AddToCart";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";

const Basket = observer(() => {
    const {basket} = useContext(Context)
    const navigate = useNavigate()
    const isBasketEmpty = basket.basketDevices?.length === 0


    return (
        <Container className="mt-5 p-0">
            {isBasketEmpty
                ? (<EmptyBasket/>)
                : (<>
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
                        {basket.basket.basket_devices?.map((item: Partial<BasketDeviceI>, index) => {
                            return (
                                <Row key={item.device?.id} className="align-items-center">
                                    <Col>{++index}</Col>
                                    <Col className="">{item.device?.name}</Col>
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
                                            basket.removeBasketDevice(item.device?.id!)
                                        }}
                                    ></Col>
                                </Row>
                            )
                        })}
                        <hr />
                        <Row>
                            <Col className="text-end">{`Price total: ${basket.priceTotal}`}</Col>
                        </Row>
                        <section className="d-flex mt-5 b-checkout-wrapper">
                            <div className="ms-auto b-checkout">
                                <Button onClick={() => navigate('/checkout' as RouteI['path'])}>Checkout</Button>
                            </div>
                        </section>
                    </>
                )
            }
        </Container>
    )
})

export default Basket;