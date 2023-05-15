import {Col, Row} from "react-bootstrap";
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {getTotalPrice, switchTitle} from "../../../views/Orders";
import {BasketDeviceI} from "../../../store/BasketStore";
import AdminOrderItemActions from "./AdminOrderItemActions";
import {OrderI} from "../../../store/OrderStore";
import BasketDeviceList from "../../BasketDeviceList";
import BasketDeviceListHeader from "../../BasketDeviceListHeader";

export const getOrderStatus = (status: string) => {
    const orderStatus = {
        title: '',
        className: '',
    }
    switch (status) {
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
            orderStatus.title = 'Closed'
            break
        default:
            break;
    }
    return orderStatus
}

interface AdminOrderItemProps extends PropsWithChildren {
    order: OrderI,
    index: number,
}

const AdminOrderItem: React.FC<AdminOrderItemProps> = ({order, index}) => {
    const [basketDevices, setBasketDevices] = useState<BasketDeviceI[]>(order.basket?.basket_devices!)
    const orderStatus = getOrderStatus(order.status)


    return (
        <>
            {/* Order header */}
            <Row key={order.id} className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
                <Col>{order.id}</Col>
                <Col className="">{order.user?.email}</Col>
                <Col
                    className="col-3">{`${order.addressone}${order.addresstwo ? `, ${order.addresstwo}` : ''}`}</Col>
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
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            switchTitle((e.target as HTMLButtonElement))
                        }}
                    >Expand
                    </button>
                </Col>
            </Row>
            {/* collapse */}
            <section key={`order-expanded-${order.id}`} className="collapse card card-body"
                     id={`collapse${order.id}`}>
                {/* Order basketDevice header */}
                <BasketDeviceListHeader />
                <hr/>
                {basketDevices.length > 0
                    ? (
                        <>
                            {/* Order basketDevice body */}
                            <BasketDeviceList basketDevices={basketDevices} setBasketDevices={setBasketDevices}/>
                            <hr/>
                        </>
                    )
                    : (
                        <>
                            <Row>
                                <Col>
                                    No devices in this order
                                </Col>
                            </Row>
                            <hr/>
                        </>
                    )
                }
                <Row key={`actions-${order.id}`} className="align-items-center">
                    <Col className="text-start">
                        <AdminOrderItemActions order={order} basketDevices={basketDevices} setBasketDevices={setBasketDevices}/>
                    </Col>
                    <Col className="text-end">{basketDevices.length > 0 && (<strong>Order
                        total: {getTotalPrice(basketDevices)}</strong>)}</Col>
                </Row>
            </section>
        </>
    )
}

export default AdminOrderItem;