import React, {ChangeEvent, Key, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchCategories, fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {DeviceI, DeviceInfoT} from "../../store/DeviceStore";
import {BasketDeviceI, incrementBasketDevice} from "../../store/BasketStore";
import {OrderI} from "../../store/OrderStore";
import {findUserData} from "../../http/userAPI";
import {createBasket, incrementBasket} from "../../http/basketAPI";
import {createOrder} from "../../http/orderAPI";

type ValueOf<T> = T[keyof T];

interface AddDeviceModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    order: OrderI,
    basketDevices: BasketDeviceI[]
    setBasketDevices: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({show, onHide, order, basketDevices, setBasketDevices}) => {
    const {device} = useContext(Context)
    const [devices, setDevices] = useState<DeviceI[]>([])
    const [selectedDevice, setSelectedDevice] = useState<DeviceI | undefined>(undefined)
    const [quantity, setQuantity] = useState<BasketDeviceI['quantity']>(1)
    const limit = 999;

    const addDevice = () => {
        incrementBasketDevice(order.basketId, selectedDevice?.id!, quantity).then((result) => {
            setBasketDevices(result.basket_devices)
        })
        onHide()
    }

    useEffect(() => {
        fetchDevices(undefined, undefined, undefined, undefined, undefined, limit).then(deviceParam => {
                setDevices(deviceParam.rows)
                setSelectedDevice(devices[0])
            }
        )

        if (show) {

            const form: HTMLFormElement = document.querySelector('form.needs-validation')!

            if (form !== null) {
                form.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault()
                    e.stopPropagation()

                    // if form is valid
                    if (form.checkValidity()) {

                    }

                    form.classList.add('was-validated')
                })
            }
        }
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
                <Form id="addDeviceForm" className="needs-validation" noValidate={true}>
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
                                <Dropdown.Toggle className="w-100">{`${selectedDevice ? selectedDevice.name : 'Choose device'}`}</Dropdown.Toggle>
                                <Dropdown.Menu >
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
                <Button type="submit" form="addDeviceForm" className="text-white btn-success btn-outline-success"
                        onClick={() => addDevice()}>Add device</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddDeviceModal;