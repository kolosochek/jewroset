import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import {OrderI} from "../../../store/OrderStore";
import {getTotalPrice, switchTitle} from "../../../views/Personal";
import {BasketDeviceI} from "../../../store/BasketStore";
import {Link} from "react-router-dom";
import BasketImage from "../../BasketImage/BasketImage";
import {Context} from "../../../index";
import AdminOrderActions from "./AdminOrderActions";
import AdminOrderListActions from "./AdminOrderListActions";
import {adminGetAllOrders} from "../../../http/orderAPI";
import {AdminOrderContext} from "../../../views/Admin/AdminOrders";
import AdminOrderItem from "./AdminOrderItem";


interface AdminOrderListProps extends PropsWithChildren{

}
const AdminOrderList: React.FC<AdminOrderListProps> = ({}) => {
    const {user} = useContext(Context)
    const {isRender} = useContext(AdminOrderContext)
    const [orders, setOrders] = useState([] as OrderI[]);
    const [count, setCount] = useState([] as Partial<OrderI>[]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        adminGetAllOrders(user.id!).then(orders => {
            setCount(orders.count)
            setOrders(orders.rows)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isRender])



    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="col-10">
            <div className="wrapper d-flex flex-column">
                <AdminOrderListActions/>
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
                            return (
                                <AdminOrderItem order={order} />
                            )
                        })}
                        <hr/>
                        <Row>
                            <Col className="text-end"></Col>
                        </Row>
                    </>)
                    : (<h3>No items in this section</h3>)
                }
            </div>
        </section>
    )
}

export default AdminOrderList;