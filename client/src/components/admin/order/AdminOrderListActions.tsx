import React, {PropsWithChildren, useContext, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import OrderModal from "../../modals/OrderModal";
import AdminOrderFilterbar from "./AdminOrderFilterbar";
import {AdminOrderContext, AdminOrderFilterI} from "../../../views/Admin/AdminOrders";
import {PaginatorI} from "../../../store/DeviceStore";

interface AdminOrderListActionsProps extends PropsWithChildren {
    orderBy: AdminOrderFilterI['orderBy'],
    setOrderBy: (value: AdminOrderFilterI['orderBy'] | ((prevVar: AdminOrderFilterI['orderBy']) => AdminOrderFilterI['orderBy'])) => void
    orderDirection: AdminOrderFilterI['orderDirection']
    setOrderDirection: (value: AdminOrderFilterI['orderDirection'] | ((prevVar: AdminOrderFilterI["orderDirection"]) => AdminOrderFilterI["orderDirection"])) => void
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void
}
const AdminOrderListActions:React.FC<AdminOrderListActionsProps> = ({orderBy, setOrderBy, orderDirection, setOrderDirection, setPage}) => {
    const [isCreateOrderVisible, setCreateOrderVisible] = useState(false)


    return (
        <Row className="mb-3">
            <Col className="text-start">
                <button
                    className="btn btn-success"
                    onClick={() => setCreateOrderVisible(true)}
                >Create new order
                </button>
                <AdminOrderContext.Consumer>
                    {({isRender}) => (
                        <OrderModal
                            mode="create"
                            show={isCreateOrderVisible}
                            onHide={() => {
                                isRender = true;
                                setCreateOrderVisible(false)
                            }
                            }/>
                    )}
                </AdminOrderContext.Consumer>
            </Col>
            <Col className="text-end">
                <AdminOrderFilterbar orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection} setPage={setPage}/>
            </Col>
        </Row>
    )
}

export default AdminOrderListActions;