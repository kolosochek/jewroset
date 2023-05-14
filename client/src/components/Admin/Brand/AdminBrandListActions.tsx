import React, {useState} from 'react';
import {Row, Col, Button} from "react-bootstrap";
import BrandModal from "../../Modals/BrandModal";

const AdminBrandListActions = () => {
    const [isBrandVisible, setBrandVisible] = useState(false)


    return (
        <Row className="text-start">
            <Col className="mb-3">
                <Button className="btn btn-success" onClick={() => setBrandVisible(true)}>Add new brand</Button>
                <BrandModal mode="create" show={isBrandVisible} onHide={() => setBrandVisible(false)}/>
            </Col>
        </Row>
    )
}

export default AdminBrandListActions;