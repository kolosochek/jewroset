import React, {useContext, useEffect, useRef, useState} from 'react';
import {usePaymentInputs} from 'react-payment-inputs';
import {Form, Row, Col, Button, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {RouteI} from "../utils/Routes";
import {useNavigate, useParams} from "react-router-dom";
import {OrderI} from "../store/OrderStore";
import {getOrder, updateOrder} from "../http/orderAPI";
import {createBasket} from "../http/basketAPI";

export default function OrderPayment() {
    const {
        meta,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs();
    const {erroredInputs, touchedInputs} = meta;
    const {basket, order, user} = useContext(Context)
    const navigate = useNavigate();
    const [orderById, setOrderById] = useState<OrderI>()
    const form = useRef<HTMLFormElement | null>(null)
    const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getOrder(parseInt(id), user.id!).then(orderParam => {
                setOrderById(orderParam);
                setIsLoading(false);
                // debug
                console.log(orderById)

            })
        }
    }, [isLoading])

    const payOrder = async () => {
        // validation
        if (form && form.current) {

            // if form is valid
            if (form.current.checkValidity()) {
                const orderObj: Partial<OrderI> = {
                    id: order.id,
                    userId: order.order.userId,
                    basketId: order.order.basketId,
                    addressone: order.order.addressone,
                    addresstwo: order.order.addresstwo,
                    country: order.order.country,
                    city: order.order.city,
                    zip: order.order.zip,
                    status: "awaitingShipping"
                }

                // get unpaid order
                getOrder(orderObj.id!, orderObj.userId!).then((orderParam) => {
                    // set order.status to awaitingShipping === paid
                    orderParam.status = orderObj.status;
                    // and update ad order
                    updateOrder(orderParam).then(() => {
                        // UI payment success
                        setIsPaymentSuccess(true);
                        //
                        // get new basket === clear basket
                        createBasket(orderObj.userId!, "open").then((newBasket) => {
                            basket.setBasket(newBasket);
                        }).catch(error => console.error(`Can't a new basket, reason: ${error.reason || error}`));
                    }).catch(error => console.error(`Can't get an order ${order.order.id}, reason: ${error.reason || error}`))
                }).catch(error => console.error(`Can't update an order ${order.order.id}, reason: ${error.reason || error}`))
            }

            form.current.classList.add('was-validated')
        }
    }

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="mt-5 mb-5">
            {!isPaymentSuccess ? (
                <>
                    <div className="row g-5">
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-primary">Your cart</span>
                                <span
                                    className="badge bg-primary rounded-pill">{id ? `${orderById!.basket?.basket_devices?.length}` : basket.itemsTotal}</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {basket.basketDevices?.map((item) => {
                                    return (
                                        <li key={item.device?.id}
                                            className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <h6 className="my-0">{item.device.name}</h6>
                                                <small
                                                    className="text-muted">{item.quantity === 1 ? `1 item` : `${item.quantity} items`}</small>
                                            </div>
                                            <span className="text-muted">${item.quantity * item.device.price!}</span>
                                        </li>
                                    )
                                })}
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>${basket.priceTotal}</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-7 col-lg-8">
                            <h4 className="mb-3">Order payment</h4>
                            <Form method="POST" className="needs-validation" ref={form} noValidate={true}>
                                <Row>
                                    <Form.Group as={Col} style={{maxWidth: '15rem'}}>
                                        <Form.Label>Card number</Form.Label>
                                        <Form.Control
                                            // Here is where React Payment Inputs injects itself into the input element.
                                            {...getCardNumberProps()}
                                            // You can retrieve error state by making use of the error & touched attributes in `meta`.
                                            isInvalid={touchedInputs.cardNumber && erroredInputs.cardNumber !== "Card number is invalid"}
                                            placeholder="0000 0000 0000 0000"
                                            required
                                        />
                                        <Form.Control.Feedback
                                            type="invalid">{erroredInputs.cardNumber}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} style={{maxWidth: '10rem'}}>
                                        <Form.Label>Expiry date</Form.Label>
                                        <Form.Control
                                            {...getExpiryDateProps()}
                                            isInvalid={touchedInputs.expiryDate && !!erroredInputs.expiryDate}
                                            required
                                        />
                                        <Form.Control.Feedback
                                            type="invalid">{erroredInputs.expiryDate}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} style={{maxWidth: '7rem'}}>
                                        <Form.Label>CVC</Form.Label>
                                        <Form.Control
                                            {...getCVCProps()}
                                            isInvalid={touchedInputs.cvc && !!erroredInputs.cvc}
                                            placeholder="123"
                                            required
                                        />
                                        <Form.Control.Feedback
                                            type="invalid">{erroredInputs.cvc}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mt-5 ">
                                    <h5 className="d-flex justify-content-between">
                                        <span>Total order amount: </span>
                                        <strong>(USD) ${basket.priceTotal}</strong>
                                    </h5>
                                </Row>
                                <Row>
                                    <Button onClick={() => payOrder()} className="mt-3">Pay</Button>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-5 text-center">
                        <h1 className="">{`Thank you! Your order has been paid!`}</h1>
                        <h3>{`We will contact you and ship your order ASAP!`}</h3>
                        <section className="d-flex mt-5 b-goto-mainpage-wrapper">
                            <div className="container b-checkout">
                                <Button onClick={() => navigate('/' as RouteI['path'])}>Main page</Button>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </section>
    );
}