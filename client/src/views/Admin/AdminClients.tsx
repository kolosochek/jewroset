import React, {createContext, useContext, useState} from 'react';
import {Button, Row, Container} from "react-bootstrap";
import CategoryModal from "../../components/Modals/CategoryModal";
import BrandModal from "../../components/Modals/BrandModal";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";
import AdminClientList from "../../components/Admin/Client/AdminClientList";


export interface AdminClientFilterI {
    orderBy: "id" | "email" | "firstname" | "lastname" | "role"
    orderDirection: "asc" | "desc"

}
export const AdminClientContext = createContext({
    isForceRender: false,
    setIsForceRender: (bool:boolean) => {},
})
const AdminClients = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isForceRender, setIsForceRender] = useState<boolean>(false)

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <AdminClientContext.Provider value={{isForceRender, setIsForceRender}}>
                        <AdminClientList />
                    </AdminClientContext.Provider>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    )
}

export default AdminClients;