import React, {createContext, useContext, useEffect, useState} from 'react';
import {Row, Container, Spinner} from "react-bootstrap";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminOrderList from "../../components/Admin/order/AdminOrderList";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";

export interface AdminOrderFilterI {
    orderBy: "status" | "createdAt"
    orderDirection: "asc" | "desc"

}
export const AdminOrderContext = createContext({
    isForceRender: false,
    setIsForceRender: (bool:boolean) => {},
})
const AdminOrders = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isForceRender, setIsForceRender] = useState<boolean>(false)

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminOrderContext.Provider  value={{isForceRender, setIsForceRender}}>
                        <AdminOrderList/>
                    </AdminOrderContext.Provider>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    );
};

export default AdminOrders;