import React, {createContext, useContext, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";
import {useLocation} from "react-router-dom";
import AdminBrandList from "../../components/Admin/Brand/AdminBrandList";

export const AdminBrandContext = createContext({
    isForceRender: false,
    setIsForceRender: (bool: boolean) => {
    },
})

const AdminBrands = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isForceRender, setIsForceRender] = useState<boolean>(false)


    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminBrandContext.Provider value={{isForceRender, setIsForceRender}}>
                        <AdminBrandList />
                    </AdminBrandContext.Provider>
                </Row>
            </Container>)
            : (<AdminAccessDenied/>)
    )
}

export default AdminBrands;