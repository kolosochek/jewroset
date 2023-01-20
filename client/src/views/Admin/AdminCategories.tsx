import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import CreateCategoryModal from "../../components/Modals/CreateCategoryModal";

const AdminCategories = () => {
    const [isCategoryVisible, setCategoryVisible] = useState(false)


    return (
        <Row className="pt-1 pb-1">
            <Col>Category:</Col>
            <Col className="text-end">
                <Button className="btn" onClick={() => setCategoryVisible(true)}>add category</Button>
                <CreateCategoryModal show={isCategoryVisible} onHide={() => setCategoryVisible(false)}/>
            </Col>
        </Row>
    )
}

export default AdminCategories;