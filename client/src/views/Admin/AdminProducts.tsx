import React, {createContext, useContext, useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import AdminAccessDenied from "../../components/admin/AdminAccessDenied";
import AdminProductList from "../../components/admin/product/AdminProductList";


export const AdminProductContext = createContext({
    isForceRender: false,
    setIsForceRender: (bool:boolean) => {},
})


const AdminProducts = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isForceRender, setIsForceRender] = useState<boolean>(false)


    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminProductContext.Provider value={{isForceRender, setIsForceRender}}>
                        <AdminProductList />
                    </AdminProductContext.Provider>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    );
};

export default AdminProducts;