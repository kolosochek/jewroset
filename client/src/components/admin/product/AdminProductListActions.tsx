import React, {useState} from 'react';
import {Button, Row, Col} from "react-bootstrap";
import DeviceModal from "../../modals/DeviceModal";

const AdminProductListActions = () => {
    const [isDeviceVisible, setDeviceVisible] = useState(false)


    return (
        <>
            <Row className="text-start">
                <Col className="mb-3">
                    <Button className="btn btn-success outline-success" onClick={() => setDeviceVisible(true)}>Create new device</Button>
                    <DeviceModal mode="create" show={isDeviceVisible} onHide={() => setDeviceVisible(false)}/>
                </Col>
            </Row>
        </>
    )
}

export default AdminProductListActions;