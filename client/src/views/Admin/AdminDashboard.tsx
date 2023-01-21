import React, {useContext, useState} from 'react';
import {Button, ListGroup, Row, Container} from "react-bootstrap";
import CreateCategoryModal from "../../components/Modals/CreateCategoryModal"
import BrandModal from "../../components/Modals/BrandModal";
import DeviceModal from "../../components/Modals/DeviceModal";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";

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