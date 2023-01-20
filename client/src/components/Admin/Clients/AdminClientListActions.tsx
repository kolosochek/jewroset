import React, {PropsWithChildren, useState} from 'react';
import {PaginatorI} from "../../../store/DeviceStore";
import {AdminClientFilterI} from "../../../views/Admin/AdminClients";
import {Row, Col, Button} from "react-bootstrap";
import AdminClientFilterbar from "./AdminClientFilterbar";

interface AdminClientListActionsProps extends PropsWithChildren {
    orderBy: AdminClientFilterI['orderBy'],
    setOrderBy: (value: AdminClientFilterI['orderBy'] | ((prevVar: AdminClientFilterI['orderBy']) => AdminClientFilterI['orderBy'])) => void,
    orderDirection: AdminClientFilterI['orderDirection'],
    setOrderDirection: (value: AdminClientFilterI['orderDirection'] | ((prevVar: AdminClientFilterI["orderDirection"]) => AdminClientFilterI["orderDirection"])) => void,
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void,
}
const AdminClientListActions:React.FC<AdminClientListActionsProps> = ({orderBy, setOrderBy, orderDirection, setOrderDirection, setPage}) => {
    const [isDeviceVisible, setDeviceVisible] = useState(false)


    return (
        <>
            <Row className="text-start">
                <Col className="mb-3">
                    <Button className="btn btn-success outline-success" onClick={() => setDeviceVisible(true)}>Create new user</Button>
                    {/* MODAL */}
                </Col>
                <Col className="text-end d-flex flex-grow-0 align-items-center">
                    <AdminClientFilterbar orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection} setPage={setPage}/>
                </Col>
            </Row>
        </>
    )
}

export default AdminClientListActions;