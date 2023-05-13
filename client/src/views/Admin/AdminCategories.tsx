import React, {createContext, useContext, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";
import {useLocation} from "react-router-dom";
import AdminCategoryList from "../../components/Admin/Category/AdminCategoryList";

export const AdminCategoryContext = createContext({
    isForceRender: false,
    setIsForceRender: (bool: boolean) => {
    },
})

const AdminCategories = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isForceRender, setIsForceRender] = useState<boolean>(false)


    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminCategoryContext.Provider value={{isForceRender, setIsForceRender}}>
                        <AdminCategoryList />
                    </AdminCategoryContext.Provider>
                </Row>
            </Container>)
            : (<AdminAccessDenied/>)
    )
}

export default AdminCategories;