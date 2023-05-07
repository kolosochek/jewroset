import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {getUserOrders} from "../http/orderAPI";
import {OrderI} from "../store/OrderStore";
import {Button, Col, Container, Figure, Row, Spinner} from "react-bootstrap";
import {RouteI} from "../utils/Routes";
import EmptyPersonal from "../components/EmptyPersonal";
import {Link, useNavigate} from "react-router-dom";
import {BasketDeviceI} from "../store/BasketStore";
import BasketImage from "../components/BasketImage/BasketImage";

export const switchTitle = (element: HTMLButtonElement|HTMLAnchorElement, values = ['Collapse', 'Expand']) => {
    if (element.hasAttributes() && element.hasAttribute('aria-expanded')) {
        if (element.getAttribute('aria-expanded') === 'true') {
            element.textContent = values[0]
        } else {
            element.textContent = values[1]
        }
    }
}

export const getTotalPrice = (basketDevices: BasketDeviceI[]) => {
    let resultTotal = 0
    if (!Array.isArray(basketDevices)) {
        return resultTotal
    }
    for (let item of basketDevices) {
        resultTotal += item.quantity * item.device.price!
    }

    return resultTotal
}

const Orders = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [orders, setOrders] = useState<Partial<OrderI>[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getUserOrders(user.id!).then((userOrders) => {
            setOrders(userOrders)
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container className="mt-5 mb-5 p-0">
            {orders.length
                ? (<>
                <Row>
                    <Col>Order id</Col>
                    <Col>Email</Col>
                    <Col className="col-3">Address</Col>
                    <Col className="text-center">Country</Col>
                    <Col className="text-center">City</Col>
                    <Col className="text-center">Status</Col>
                    <Col className="text-end">Action</Col>
                </Row>
                <hr/>
                {(orders as OrderI[]).map((order: OrderI, index) => {
                    const orderStatus = {
                        title: '',
                        className: '',
                    }
                    switch (order.status) {
                        case "awaitingPayment":
                            orderStatus.className = 'text-danger'
                            orderStatus.title = 'Awaiting payment'
                            break;
                        case "awaitingShipping":
                            orderStatus.className = 'text-primary'
                            orderStatus.title = 'Awaiting shipping'
                            break;
                        case "shipped":
                            orderStatus.className = 'text-success'
                            orderStatus.title = 'Sent'
                            break
                        case "closed":
                            orderStatus.className = 'text-error'
                            orderStatus.title = 'Sent'
                            break
                        default:
                            break;
                    }

                    return (
                        <>
                            <Row key={`personal-order-row-${order.id}`} className="align-items-center mb-2 mt-2">
                                <Col>{order.id}</Col>
                                <Col className="">{user.user.email}</Col>
                                <Col
                                    className="col-3">{`${order.addressone}${order.addresstwo ? `, ${order.addresstwo}` : ''}`}</Col>
                                <Col className="text-center">{order.country}</Col>
                                <Col className="text-center">{order.city}</Col>
                                <Col className={`text-center ${orderStatus.className}`}>{orderStatus.title}</Col>
                                <Col className="text-end">
                                    <Button
                                        className="btn btn-primary"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${order.id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${order.id}`}
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            switchTitle((e.target as HTMLButtonElement))
                                        }}
                                    >Expand
                                    </Button>
                                    {order.status === "awaitingPayment" && (
                                        <Button
                                            onClick={() => {
                                                navigate(`/payment/${order.id}`)
                                            }}
                                        >Pay</Button>
                                    )}
                                </Col>
                            </Row>
                            <section key={`order-expanded-${order.id}`} className="collapse card card-body"
                                     id={`collapse${order.id}`}>
                                <Row key={`order-expanded-row-${order.id}`}>
                                    <Col>#</Col>
                                    <Col className="col-3">Name</Col>
                                    <Col className="text-center">Img</Col>
                                    <Col className="text-center">Quantity</Col>
                                    <Col className="text-center">Price</Col>
                                    <Col className="text-end">Total</Col>
                                </Row>
                                <hr/>
                                {order.basket?.basket_devices?.map((item: Partial<BasketDeviceI>, i) => {
                                    return (
                                        <>
                                            <Row key={`order-basket-basketdevice-${item.device?.id}`}
                                                 className="align-items-center">
                                                <Col className="">{++i}</Col>
                                                <Col className="col-3"><Link
                                                    to={`/device/${item.device?.id}`}>{item.device?.name}</Link></Col>
                                                <Col className="text-center">
                                                    <BasketImage
                                                        key={`order-basket-basketdevice-basketimage-${item.device?.id}`}
                                                        alt={item.device?.name!}
                                                        imageUrl={item.device?.img!}/>
                                                </Col>
                                                <Col className="text-center">{item.quantity}</Col>
                                                <Col className="text-center">{item.device?.price}</Col>
                                                <Col
                                                    className="text-end"><strong>{item.device?.price! * item.quantity!}</strong></Col>
                                            </Row>
                                        </>
                                    )
                                })}
                <hr/>
                <Row key={`order-total-price-${order.id}`}>
                    <Col className="text-end"><strong>Order
                        total: {getTotalPrice(order.basket?.basket_devices!)}</strong></Col>
                </Row>
                </section>
                </>
                )
            })}
            <hr/>
            <Row>
                <Col className="text-end"></Col>
            </Row>
            <section className="d-flex mt-5 b-goto-mainpage-wrapper">
                <div className="ms-auto b-checkout">
                    <Button onClick={() => navigate('/' as RouteI['path'])}>Main page</Button>
                </div>
            </section>
        </>
)
: (<EmptyPersonal/>)
}
</Container>
)
}

    export default Orders;