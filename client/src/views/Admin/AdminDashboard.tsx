import React, {useContext, useState} from 'react';
import {Button, ListGroup, Row, Container} from "react-bootstrap";
import CreateCategoryModal from "../../components/modals/CreateCategoryModal"
import CreateBrandModal from "../../components/modals/CreateBrandModal";
import DeviceModal from "../../components/modals/DeviceModal";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminAccessDenied from "../../components/admin/AdminAccessDenied";

const AdminDashboard = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <section className="col-10">
                        <div className="wrapper d-flex flex-column">
                            <p>Orders total: {134}</p>
                            <p>Clients total: {1231}</p>
                            <p>Unshipped orders: {123}</p>
                        </div>
                    </section>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    )
}

export default AdminDashboard;