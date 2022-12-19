import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

interface CreateDeviceModalProps {
    show: boolean,
    onHide: () => void | undefined,
}
const CreateDeviceModal = ({show, onHide}:Partial<CreateDeviceModalProps>) => {
    const {device} = useContext(Context)
    const [deviceInfo, setDeviceInfo] = useState([] as any)
    const addDeviceInfo = () => {
        setDeviceInfo([...deviceInfo, {
            title: ``,
            description: ``,
            number: Date.now(),
        }])
    }
    
    const removeDeviceInfo = (number:number) => {
        setDeviceInfo(deviceInfo.filter((info:Record<string, string|number>) => info.number !== number))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>Choose category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.categories.map((category) => {
                               return (
                                   <Dropdown.Item key={category.id}>{category.name}</Dropdown.Item>
                               )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>Choose brand</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => {
                               return (
                                   <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                               )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder="Device name"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter device price"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Device image"
                        type="file"
                    />
                    <Button
                        className="mt-5 btn text-white"
                        onClick={addDeviceInfo}
                    >Add device info</Button>
                    {deviceInfo.map((value:Record<string, string>) => {
                        return (
                            <Row className="mt-2" key={value.number}>
                               <Col md={4}>
                                   <Form.Control
                                       placeholder="Add title"
                                   />
                               </Col>
                               <Col md={4}>
                                   <Form.Control
                                       placeholder="Add description"
                                   />
                               </Col>
                               <Col md={4}>
                                   <Button
                                       onClick={() => removeDeviceInfo(Number(value.number))}
                                       className="btn text-white btn-warning"
                                   >Remove</Button>
                               </Col>
                            </Row>
                        )
                    })}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Add category</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDeviceModal;