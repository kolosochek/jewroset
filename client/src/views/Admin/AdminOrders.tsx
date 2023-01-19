import React, {createContext, useContext, useEffect, useState} from 'react';
import {Row, Container, Spinner} from "react-bootstrap";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminOrderList from "../../components/admin/order/AdminOrderList";
import AdminAccessDenied from "../../components/admin/AdminAccessDenied";

export interface AdminOrderFilterI {
    orderBy: "status" | "createdAt"
    orderDirection: "asc" | "desc"

}

const AdminOrders = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()


    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminOrderList/>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    );
};

export default AdminOrders;