import React, {PropsWithChildren} from 'react';
import {CategoryI} from "../../../store/DeviceStore";
import {Row, Col} from "react-bootstrap";
import AdminCategoryItemActions from "./AdminCategoryItemActions";

interface AdminCategoryItemProps extends PropsWithChildren {
    category: CategoryI,
    index: number,
}
const AdminCategoryItem:React.FC<AdminCategoryItemProps> = ({category, index}) => {
    return (
        <Row className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
            <Col className="text-start">{category.id}</Col>
            <Col className="col-3">{category.name}</Col>
            <Col className="text-end col-2">
                <AdminCategoryItemActions category={category} />
            </Col>
        </Row>
    )
}

export default AdminCategoryItem;