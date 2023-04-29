import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {fetchDevices} from "../../http/deviceAPI";
import {DeviceI} from "../../store/DeviceStore";
import {BasketDeviceI, incrementBasketDevice} from "../../store/BasketStore";
import {OrderI} from "../../store/OrderStore";
import {AdminOrderContext} from "../../views/Admin/AdminOrders";

interface IAddDeviceModalProps {
    show: boolean,
    onHide: () => void | undefined,
    order: OrderI,
    basketDevices: BasketDeviceI[]
    setBasketDevices: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
}

const AddDeviceModal = ({show, onHide, order, basketDevices, setBasketDevices}: IAddDeviceModalProps) => {
    const form = useRef<HTMLFormElement | null>(null);
    const {isForceRender, setIsForceRender} = useContext(AdminOrderContext)
    const forceParentRender = () => setIsForceRender(!isForceRender)
    const [devices, setDevices] = useState<DeviceI[]>([])
    const [selectedDevice, setSelectedDevice] = useState<DeviceI | undefined>(undefined)
    const [quantity, setQuantity] = useState<BasketDeviceI['quantity']>(1)
    const limit = 999;

    const addDevice = () => {
        if (form && form.current) {
            // if form is valid
            if (form.current.checkValidity()) {
                incrementBasketDevice(order.basketId, selectedDevice?.id!, quantity).then((result) => {
                    setBasketDevices(result.basket_devices);
                    forceParentRender();
                    onHide();
                })

            }

            form.current.classList.add('was-validated')
        }
    }

    useEffect(() => {
        fetchDevices(undefined, undefined, undefined, undefined, undefined, limit).then(deviceParam => {
                setDevices(deviceParam.rows)
                setSelectedDevice(devices[0])
            }
        )
    }, [show])


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addDeviceForm" ref={form} className="needs-validation" noValidate={true}>
                    <Row>
                        <Col className="col-9 align-items-center ">
                            Name
                        </Col>
                        <Col className="col-3 align-items-center text-end">
                            Quantity
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 align-items-center d-flex">
                            <Dropdown
                                className="mt-2 mb-2 w-100"
                            >
                                <Dropdown.Toggle
                                    className="w-100">{`${selectedDevice ? selectedDevice.name : 'Choose device'}`}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {devices.map((item) => {
                                        return (
                                            <Dropdown.Item key={`${item.id}`} onClick={() => {
                                                setSelectedDevice(item)
                                            }}>{item.name}</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                        <Col className="col-2 align-items-center d-flex">
                            <div className="">
                                <Form.Control
                                    onChange={e => setQuantity(+e.target!.value)}
                                    value={quantity}
                                    type="number"
                                    className="form-control text-end"
                                    placeholder=""
                                    name="quantity"
                                    id="quantity"
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid quantity
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="addDeviceForm" className="text-white btn-success btn-outline-success"
                        onClick={addDevice}>Add device</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default AddDeviceModal