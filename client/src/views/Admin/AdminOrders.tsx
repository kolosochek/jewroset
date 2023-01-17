import React, {createContext, useContext, useEffect, useState} from 'react';
import {Row, Container, Spinner} from "react-bootstrap";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminOrderList from "../../components/admin/order/AdminOrderList";

export interface AdminOrderFilterI {
    orderBy: "status" | "creation"
    orderDirection: "asc" | "desc"

}

const orderFilter = {
    orderBy: 'creation',
        orderDirection: 'desc',
}

export const AdminOrderContext = createContext({
    isRender: false,
    setIsRender: (bool:boolean) => {},
})
const AdminOrders = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isRender, setIsRender] = useState(false);


    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminOrderContext.Provider value={{isRender, setIsRender}}>
                        <AdminOrderList />
                    </AdminOrderContext.Provider>
                </Row>
            </Container>)
            : (<h1>Not enough rights to access that page!</h1>)
    );
};

export default AdminOrders;