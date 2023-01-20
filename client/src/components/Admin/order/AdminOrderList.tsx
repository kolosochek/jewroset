import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import {OrderI} from "../../../store/OrderStore";
import {Context} from "../../../index";
import AdminOrderListActions from "./AdminOrderListActions";
import {adminGetAllOrders} from "../../../http/orderAPI";
import {AdminOrderContext, AdminOrderFilterI} from "../../../views/Admin/AdminOrders";
import AdminOrderItem from "./AdminOrderItem";
import {PaginatorI} from "../../../store/DeviceStore";
import AdminOrderListHeader from "./AdminOrderListHeader";
import AdminPagination from "../AdminPagination";


interface AdminOrderListProps extends PropsWithChildren {

}
const AdminOrderList: React.FC<AdminOrderListProps> = ({}) => {
    const [orders, setOrders] = useState<OrderI[]>([]);
    const {isForceRender, setIsForceRender} = useContext(AdminOrderContext)
    // pagination
    const [totalCount, setTotalCount] = useState<PaginatorI['totalCount']>(0);
    const [page, setPage] = useState<PaginatorI["page"]>(1);
    const limit = 10;
    // filterbar
    const [orderBy, setOrderBy] = useState<AdminOrderFilterI['orderBy']>('createdAt')
    const [orderDirection, setOrderDirection] = useState<AdminOrderFilterI['orderDirection']>('desc')
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        adminGetAllOrders(page, limit, orderBy, orderDirection).then(orders => {
            setOrders(orders.rows)
            setTotalCount(orders.count)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isForceRender, page, orderBy, orderDirection])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="col-10">
            <div className="wrapper d-flex flex-column">
                <AdminOrderListActions
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    orderDirection={orderDirection}
                    setOrderDirection={setOrderDirection}
                    setPage={setPage}
                />
                <section className="mt-3 mb-3">
                    {orders
                        ? (<>
                            <AdminOrderListHeader />
                            {(orders as OrderI[]).map((order: OrderI, index) => {
                                return (
                                    <AdminOrderItem key={order.id} order={order} index={index}  />
                                )
                            })}
                        </>)
                        : (<h3>No items in this section</h3>)
                    }
                </section>
            </div>
            <AdminPagination page={page} totalCount={totalCount} limit={limit} setPage={setPage} setIsForceRender={setIsForceRender} isForceRender={isForceRender}/>
        </section>
    )
}

export default AdminOrderList;