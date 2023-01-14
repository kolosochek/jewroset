import React, {useContext, useEffect, useState} from 'react';
import {Button, ListGroup, Row, Container, Col, Spinner} from "react-bootstrap";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import {Link, useLocation} from "react-router-dom";
import {adminGetAllOrders} from "../../http/orderAPI";
import {OrderI} from "../../store/OrderStore";
import {BasketDeviceI} from "../../store/BasketStore";
import BasketImage from "../../components/BasketImage/BasketImage";
import {getTotalPrice, switchTitle} from "../Personal";

const AdminOrders = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [orders, setOrders] = useState([] as Partial<OrderI>[]);
    const [count, setCount] = useState([] as Partial<OrderI>[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        adminGetAllOrders(user.id!).then(orders => {
            setCount(orders.count)
            setOrders(orders.rows)
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <section className="col-10">
                        <div className="wrapper d-flex flex-column">
                            {orders
                                ? (<>
                                        <Row>
                                            <Col className="">Order id</Col>
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
                                            switch(order.status){
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
                                                    <Row key={order.id} className="align-items-center mb-2 mt-2">
                                                        <Col>{order.id}</Col>
                                                        <Col className="">{user.user.email}</Col>
                                                        <Col className="col-3">{`${order.addressone}${order.addresstwo ? `, ${order.addresstwo}` : ''}`}</Col>
                                                        <Col className="text-center">{order.country}</Col>
                                                        <Col className="text-center">{order.city}</Col>
                                                        <Col className={`text-center ${orderStatus.className}`}>{orderStatus.title}</Col>
                                                        <Col className="text-end">
                                                            <button
                                                                className="btn btn-primary"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#collapse${order.id}`}
                                                                aria-expanded="false"
                                                                aria-controls={`collapse${order.id}`}
                                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {switchTitle((e.target as HTMLButtonElement))}}
                                                            >Expand
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                    <section key={`order-expanded-${order.id}`} className="collapse card card-body" id={`collapse${order.id}`} >
                                                        <Row>
                                                            <Col>#</Col>
                                                            <Col className="col-3">Name</Col>
                                                            <Col className="text-center">Img</Col>
                                                            <Col className="text-center">Quantity</Col>
                                                            <Col className="text-center">Price</Col>
                                                            <Col className="text-end">Total</Col>
                                                        </Row>
                                                        <hr />
                                                        {order.basket?.basket_devices?.map((item: Partial<BasketDeviceI>, i) => {
                                                            return (
                                                                <Row key={item.device?.id} className="align-items-center">
                                                                    <Col className="">{++i}</Col>
                                                                    <Col className="col-3"><Link to={`/device/${item.device?.id}`}>{item.device?.name}</Link></Col>
                                                                    <Col className="text-center">
                                                                        <BasketImage imageUrl={item.device?.img!} />
                                                                    </Col>
                                                                    <Col className="text-center">{item.quantity}</Col>
                                                                    <Col className="text-center">{item.device?.price}</Col>
                                                                    <Col className="text-end"><strong>{item.device?.price! * item.quantity!}</strong></Col>
                                                                </Row>
                                                            )
                                                        })}
                                                        <hr />
                                                        <Row>
                                                            <Col className="text-end"><strong>Order total: {getTotalPrice(order.basket?.basket_devices!)}</strong></Col>
                                                        </Row>
                                                    </section>
                                                </>
                                            )
                                        })}
                                        <hr/>
                                        <Row>
                                            <Col className="text-end"></Col>
                                        </Row>
                                    </>
                                )
                                : (<h3>No items in this section</h3>)

                            }
                        </div>
                    </section>
                </Row>
            </Container>)
            : (<h1>Not enough rights to access that page!</h1>)
    );
};

export default AdminOrders;