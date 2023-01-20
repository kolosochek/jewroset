import React, {useContext, useState} from 'react';
import {Button, Row, Container} from "react-bootstrap";
import CreateCategoryModal from "../../components/modals/CreateCategoryModal";
import CreateBrandModal from "../../components/modals/CreateBrandModal";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";

const AdminClients = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isBrandVisible, setBrandVisible] = useState(false)
    const [isCategoryVisible, setCategoryVisible] = useState(false)

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <section className="col-10">
                        <div className="wrapper d-flex flex-column">
                            <Button className="btn" onClick={() => setCategoryVisible(true)}>add category</Button>
                            <Button className="btn" onClick={() => setBrandVisible(true)}>add brand</Button>
                            <CreateCategoryModal show={isCategoryVisible} onHide={() => setCategoryVisible(false)}/>
                            <CreateBrandModal show={isBrandVisible} onHide={() => setBrandVisible(false)}/>
                        </div>
                    </section>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    )
}

export default AdminClients;