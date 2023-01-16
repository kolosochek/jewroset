import React, {useContext, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import OrderModal from "../../modals/OrderModal";
import AdminOrderFilterbar from "./AdminOrderFilterbar";
import {AdminOrderContext} from "../../../views/Admin/AdminOrders";

const AdminOrderListActions = () => {
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
                <AdminOrderFilterbar/>
            </Col>
        </Row>
    )
}

export default AdminOrderListActions;