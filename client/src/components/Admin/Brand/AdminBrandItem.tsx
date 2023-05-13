import React, {PropsWithChildren} from 'react';
import {BrandI} from "../../../store/DeviceStore";
import {Row, Col} from "react-bootstrap";
import AdminBrandItemActions from "./AdminBrandItemActions";

interface AdminBrandItemProps extends PropsWithChildren {
    brand: BrandI,
    index: number,
}
const AdminBrandItem:React.FC<AdminBrandItemProps> = ({brand, index}) => {
    return (
        <Row className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
            <Col className="text-start">{brand.id}</Col>
            <Col className="col-3">{brand.name}</Col>
            <Col className="text-end col-2">
                <AdminBrandItemActions brand={brand} />
            </Col>
        </Row>
    )
}

export default AdminBrandItem;