import React, {PropsWithChildren} from 'react';
import {Col, Row} from "react-bootstrap";
import {getTotalPrice, switchTitle} from "../../../views/Personal";
import {BasketDeviceI} from "../../../store/BasketStore";
import {Link} from "react-router-dom";
import BasketImage from "../../BasketImage/BasketImage";
import AdminOrderActions from "./AdminOrderActions";
import {OrderI} from "../../../store/OrderStore";
import {UserI} from "../../../store/UserStore";
import BasketDeviceList from "../../BasketDeviceList";

interface AdminOrderItemProps extends PropsWithChildren {
    order: OrderI,
}
const AdminOrderItem:React.FC<AdminOrderItemProps> = ({order}) => {
    const getOrderStatus = (status:string) => {
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
    const orderStatus = getOrderStatus(order.status)

    return (
        <>
            <Row key={order.id} className="align-items-center mb-2 mt-2">
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
            <section key={`order-expanded-${order.id}`} className="collapse card card-body"
                     id={`collapse${order.id}`}>
                <Row key={`order-items-${order.id}`}>
                    <Col>#</Col>
                    <Col className="col-3">Name</Col>
                    <Col className="text-center">Img</Col>
                    <Col className="text-center">Quantity</Col>
                    <Col className="text-center">Price</Col>
                    <Col className="text-end">Total</Col>
                </Row>
                <hr/>
                    <BasketDeviceList basketDevices={order.basket?.basket_devices!} />
                <hr/>
                <Row key={`actions-${order.id}`} className="align-items-center">
                    <Col className="text-start">
                        <AdminOrderActions order={order} />
                    </Col>
                    <Col className="text-end"><strong>Order
                        total: {getTotalPrice(order.basket?.basket_devices!)}</strong></Col>
                </Row>
            </section>
        </>
    )
}

export default AdminOrderItem;