import React, {useContext} from 'react';
import {Button, Col, Container, Figure, Row} from "react-bootstrap";
import {Context} from "../index";
import EmptyBasket from "../components/EmptyBasket";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import BasketDeviceList from "../components/BasketDeviceList";

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
                            <Col className="col-3">Name</Col>
                            <Col className="text-center">Img</Col>
                            <Col className="text-center">Quantity</Col>
                            <Col className="text-center">Price</Col>
                            <Col className="text-center">Total</Col>
                            <Col className="text-end">Action</Col>
                        </Row>
                        <hr/>
                        <BasketDeviceList basketDevices={basket.basketDevices!} basket={basket}/>
                        <hr/>
                        <Row>
                            <Col className="text-end"><strong>{`Price total: ${basket.priceTotal}`}</strong></Col>
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