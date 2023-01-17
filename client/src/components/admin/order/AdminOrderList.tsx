import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import {OrderI} from "../../../store/OrderStore";
import {Context} from "../../../index";
import AdminOrderListActions from "./AdminOrderListActions";
import {adminGetAllOrders} from "../../../http/orderAPI";
import {AdminOrderContext, AdminOrderFilterI} from "../../../views/Admin/AdminOrders";
import AdminOrderItem from "./AdminOrderItem";
import AdminOrderListPagination from "./AdminOrderListPagination";


interface AdminOrderListProps extends PropsWithChildren{

}
const AdminOrderList: React.FC<AdminOrderListProps> = ({}) => {
    const {user} = useContext(Context)
    const {isRender} = useContext(AdminOrderContext)
    const [orders, setOrders] = useState<OrderI[]>([]);
    // pagination
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const limit = 10;
    // filterbar
    const [orderBy, setOrderBy] = useState<AdminOrderFilterI['orderBy']>('createdAt')
    const [orderDirection, setOrderDirection] = useState<AdminOrderFilterI['orderDirection']>('desc')
    //
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        adminGetAllOrders(user.id!, page, limit, orderBy, orderDirection).then(orders => {
            setOrders(orders.rows)
            setTotalCount(orders.count)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isRender, page, orderBy, orderDirection])



    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="col-10">
            <div className="wrapper d-flex flex-column">
                <AdminOrderListActions orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection} setPage={setPage} />
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
                        <hr />
                        {(orders as OrderI[]).map((order: OrderI, index) => {
                            return (
                                <AdminOrderItem key={order.id} order={order} index={index}/>
                            )
                        })}
                    </>)
                    : (<h3>No items in this section</h3>)
                }
            </div>
            <AdminOrderListPagination page={page} totalCount={totalCount} limit={limit} setPage={setPage} setIsLoading={setIsLoading} />
        </section>
    )
}

export default AdminOrderList;