import React, {PropsWithChildren, useContext, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import OrderModal from "../../modals/OrderModal";
import AdminOrderFilterbar from "./AdminOrderFilterbar";
import {AdminOrderFilterI} from "../../../views/Admin/AdminOrders";
import {PaginatorI} from "../../../store/DeviceStore";

interface AdminOrderListActionsProps extends PropsWithChildren {
    orderBy: AdminOrderFilterI['orderBy'],
    setOrderBy: (value: AdminOrderFilterI['orderBy'] | ((prevVar: AdminOrderFilterI['orderBy']) => AdminOrderFilterI['orderBy'])) => void,
    orderDirection: AdminOrderFilterI['orderDirection'],
    setOrderDirection: (value: AdminOrderFilterI['orderDirection'] | ((prevVar: AdminOrderFilterI["orderDirection"]) => AdminOrderFilterI["orderDirection"])) => void,
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void,
    isForceParentRender: boolean,
    setIsForceParentRender: (value: boolean | ((varPrev: boolean) => boolean)) => void
}
const AdminOrderListActions:React.FC<AdminOrderListActionsProps> = ({orderBy, setOrderBy, orderDirection, setOrderDirection, setPage, isForceParentRender, setIsForceParentRender}) => {
    const [isCreateOrderVisible, setCreateOrderVisible] = useState(false)


    return (
        <Row className="mb-3">
            <Col className="text-start">
                <button
                    className="btn btn-success"
                    onClick={() => setCreateOrderVisible(true)}
                >Create new order
                </button>
                        <OrderModal
                            mode="create"
                            show={isCreateOrderVisible}
                            isForceParentRender={isForceParentRender}
                            setIsForceParentRender={setIsForceParentRender}
                            onHide={() => {
                                setIsForceParentRender(!isForceParentRender)
                                setCreateOrderVisible(false)
                            }
                            }/>
            </Col>
            <Col className="text-end d-flex flex-grow-0 align-items-center">
                <AdminOrderFilterbar orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection} setPage={setPage}/>
            </Col>
        </Row>
    )
}

export default AdminOrderListActions;