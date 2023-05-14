import React, {useState} from 'react';
import {Row, Col, Button} from "react-bootstrap";
import CategoryModal from "../../Modals/CategoryModal";

const AdminCategoryListActions = () => {
    const [isCategoryVisible, setCategoryVisible] = useState(false)


    return (
        <Row className="text-start">
            <Col className="mb-3">
                <Button className="btn btn-success" onClick={() => setCategoryVisible(true)}>Add new category</Button>
                <CategoryModal mode="create" show={isCategoryVisible} onHide={() => setCategoryVisible(false)}/>
            </Col>
        </Row>
    )
}

export default AdminCategoryListActions;