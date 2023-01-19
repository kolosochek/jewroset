import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import CreateBrandModal from "../../components/modals/CreateBrandModal";

const AdminBrands = () => {
    const [isBrandVisible, setBrandVisible] = useState(false)


    return (
        <Row className="pt-1 pb-1">
            <Col>Brand:</Col>
            <Col className="text-end">
                <Button className="btn" onClick={() => setBrandVisible(true)}>add brand</Button>
                <CreateBrandModal show={isBrandVisible} onHide={() => setBrandVisible(false)}/>
            </Col>
        </Row>
    )
}

export default AdminBrands;