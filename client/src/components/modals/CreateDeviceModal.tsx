import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, FormControlProps, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createCategory, createDevice, fetchBrands, fetchCategories, fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

interface CreateDeviceModalProps {
    show: boolean,
    onHide: () => void | undefined,
}
const CreateDeviceModal = observer(({show, onHide}:Partial<CreateDeviceModalProps>) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([] as any)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState<File | null>(null)
    const addDeviceInfo = () => {
        setInfo([...info, {
            title: ``,
            description: ``,
            number: Date.now(),
        }])
    }

    const addDevice = () => {
        console.log(file)
            createDevice({ name: name, price: price, img: file as any, rating: 0, categoryId:device.selectedCategory.id, brandId: device.selectedBrand.id }).then(data => {
                //onHide()
            })

    }

    const selectFile = (e:ChangeEvent) => {
        setFile((e.target! as HTMLInputElement).files![0])
    }

    const removeDeviceInfo = (number:number) => {
        setInfo(info.filter((info:Record<string, string|number>) => info.number !== number))
    }

    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])


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
                    <Dropdown onChange={(e) => {
                        console.log(e.target)
                    }
                    }
                              className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedCategory.name ?? `Choose category`}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.categories.map((category) => {
                                return (
                                    <Dropdown.Item onClick={() => device.setSelectedCategory(category!)} key={category?.id}>{category?.name}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name ?? `Choose brand`}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => {
                                return (
                                    <Dropdown.Item onClick={() => device.setSelectedBrand(brand!)} key={brand?.id}>{brand?.name}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        onChange={e => setName(e.target!.value)}
                        value={name}
                        className="mt-3"
                        placeholder="Device name"
                    />
                    <Form.Control
                        onChange={e => setPrice(+e.target!.value)}
                        value={price}
                        className="mt-3"
                        placeholder="Enter device price"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Device image"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={selectFile}
                    />
                    <Button
                        className="mt-5 btn text-white"
                        onClick={addDeviceInfo}
                    >Add device info</Button>
                    {info.map((value:Record<string, string>) => {
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
                <Button className="text-white btn-success btn-outline-success" onClick={addDevice}>Add device</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDeviceModal;