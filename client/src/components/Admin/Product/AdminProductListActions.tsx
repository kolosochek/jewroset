import React, {PropsWithChildren, useState} from 'react';
import {Button, Row, Col} from "react-bootstrap";
import DeviceModal from "../../Modals/DeviceModal";
import AdminProductFilterbar from "./AdminProductFilterbar";
import {AdminProductFilterI} from "../../../views/Admin/AdminProducts";
import {PaginatorI} from "../../../store/DeviceStore";

interface AdminProductListActionsProps extends PropsWithChildren {
    orderBy: AdminProductFilterI['orderBy'],
    setOrderBy: (value: AdminProductFilterI['orderBy'] | ((prevVar: AdminProductFilterI['orderBy']) => AdminProductFilterI['orderBy'])) => void,
    orderDirection: AdminProductFilterI['orderDirection'],
    setOrderDirection: (value: AdminProductFilterI['orderDirection'] | ((prevVar: AdminProductFilterI["orderDirection"]) => AdminProductFilterI["orderDirection"])) => void,
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void,
}
const AdminProductListActions:React.FC<AdminProductListActionsProps> = ({orderBy, setOrderBy, orderDirection, setOrderDirection, setPage}) => {
    const [isDeviceVisible, setDeviceVisible] = useState(false)


    return (
        <>
            <Row className="text-start">
                <Col className="mb-3">
                    <Button className="btn btn-success outline-success" onClick={() => setDeviceVisible(true)}>Create new device</Button>
                    <DeviceModal mode="create" show={isDeviceVisible} onHide={() => setDeviceVisible(false)}/>
                </Col>
                <Col className="text-end d-flex flex-grow-0 align-items-center">
                    <AdminProductFilterbar orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection} setPage={setPage}/>
                </Col>
            </Row>
        </>
    )
}

export default AdminProductListActions;