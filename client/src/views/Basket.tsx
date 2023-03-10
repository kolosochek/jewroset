import React, {useContext, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import EmptyBasket from "../components/EmptyBasket";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import BasketDeviceList from "../components/BasketDeviceList";
import BasketDeviceListHeader from "../components/BasketDeviceListHeader";
import {BasketDeviceI} from "../store/BasketStore";


const Basket = observer(() => {
    const {basket} = useContext(Context)
    const navigate = useNavigate()
    const [basketDevices, setBasketDevices] = useState<BasketDeviceI[]>([])
    const isBasketEmpty = basket.basketDevices?.length === 0


    return (
        <Container className="mt-5 p-0">
            {!isBasketEmpty
                ? (<>
                        <BasketDeviceListHeader />
                        <hr/>
                        <BasketDeviceList basketDevices={basket.basketDevices} setBasketDevices={setBasketDevices}/>
                        <hr/>
                        <Row>
                            <Col className="text-end"><strong>{`Price total: ${basket.priceTotal}`}</strong></Col>
                        </Row>
                        <section className="d-flex mt-5 b-checkout-wrapper">
                            <div className="ms-auto b-checkout">
                                {basket.priceTotal !== 0
                                    && <Button onClick={() => {
                                    navigate('/checkout' as RouteI['path'])
                                }}>Checkout</Button>
                                }
                            </div>
                        </section>
                    </>
                )
                : (<EmptyBasket/>)
            }
        </Container>
    )
})

export default Basket;