import React, {useContext, useState} from 'react';
import {Button, ListGroup, Row, Container} from "react-bootstrap";
import CreateCategoryModal from "../../components/modals/CreateCategoryModal"
import CreateBrandModal from "../../components/modals/CreateBrandModal";
import CreateDeviceModal from "../../components/modals/CreateDeviceModal";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";

const AdminDashboard = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isBrandVisible, setBrandVisible] = useState(false)
    const [isCategoryVisible, setCategoryVisible] = useState(false)
    const [isDeviceVisible, setDeviceVisible] = useState(false)

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <section className="col-9">
                        <div className="wrapper d-flex flex-column">
                            <p>Orders total: {134}</p>
                            <p>Clients total: {1231}</p>
                            <p>Unshipped orders: {123}</p>
                        </div>
                    </section>
                </Row>
            </Container>)
            : (<h1>Not enough rights to access that page!</h1>)
    )
}

export default AdminDashboard;