import React, {useContext} from 'react';
import {Button, Col, Container, Figure, Row} from "react-bootstrap";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";
import EmptyBasket from "../components/EmptyBasket";
import AddToCart from "../components/AddToCart/AddToCart";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import BasketImage from "../components/BasketImage/BasketImage";

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
                        {basket.basket.basket_devices?.map((item: Partial<BasketDeviceI>, index) => {
                            return (
                                <Row key={item.device?.id} className="align-items-center">
                                    <Col>{++index}</Col>
                                    <Col className="col-3"><Link to={`/device/${item.device?.id}`}>{item.device?.name}</Link></Col>
                                    <Col className="text-center">
                                        <BasketImage imageUrl={item.device?.img!} />
                                    </Col>
                                    <Col className="text-center"><AddToCart device={item?.device}
                                                                            quantity={item.quantity}/></Col>
                                    <Col className="text-center">{item.device?.price}</Col>
                                    <Col className="text-center"><strong>{item.device?.price! * item.quantity!}</strong></Col>
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