import React, {ChangeEvent, Key, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchCategories} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {CategoryI, BrandI, DeviceI, DeviceInfoT} from "../../store/DeviceStore";

type ValueOf<T> = T[keyof T];
type ModeT = "create" | "edit"

interface CreateDeviceModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT
}

const DeviceModal: React.FC<CreateDeviceModalProps> = observer(({show, onHide, mode}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState<DeviceInfoT[]>([])
    const [category, setCategory] = useState<CategoryI['id']>()
    const [brand, setBrand] = useState<BrandI['id']>()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [file, setFile] = useState<File | null>(null)

    const addDeviceInfo = () => {
        setInfo([...info, {
            title: ``,
            description: ``,
            number: Date.now(),
        }])
    }

    const selectFile = (e: ChangeEvent) => {
        setFile((e.target! as HTMLInputElement).files![0])
    }

    const removeDeviceInfo = (number: number) => {
        setInfo(info.filter((info: DeviceInfoT) => info.number !== number))
    }

    const changeDeviceInfo = (key: keyof DeviceInfoT, value: ValueOf<DeviceInfoT>, number: Date) => {
        setInfo(info.map(info => info.number === number ? {...info, [key]: value} : info))
    }


    const addDevice = () => {
        const formData = new FormData()
        formData.append(`name`, name)
        formData.append('price', `${price}`)
        formData.append('rating', `${rating}`)
        formData.append('img', file!)
        formData.append('brandId', `${device!.selectedBrand.id}`)
        formData.append('categoryId', `${device!.selectedCategory.id}`)
        formData.append('info', JSON.stringify(info))
        createDevice(formData as Partial<DeviceI>).then(data => {
            onHide()
        })
    }

    useEffect(() => {
        fetchCategories().then(categoriesParam => device.setCategories(categoriesParam))
        fetchBrands().then(brandsParam => device.setBrands(brandsParam))
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
                    Create new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="name">Name</Form.Label>
                        <Form.Select
                            onChange={e => setCategory(+e.target?.value!)}
                            value={category}
                            className="form-control"
                            placeholder="Device name"
                            required
                        >
                            {device.categories.map((category) => {
                                return (
                                    <option value={category.id} key={category?.id}>{category?.name}</option>
                                )
                            })}
                        </Form.Select>
                    </div>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name ?? `Choose brand`}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => {
                                return (
                                    <Dropdown.Item onClick={() => device.setSelectedBrand(brand!)}
                                                   key={brand?.id}>{brand?.name}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="name">Name</Form.Label>
                        <Form.Control
                            onChange={e => setName(e.target!.value)}
                            value={name}
                            className="form-control"
                            placeholder="Device name"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="price">Price</Form.Label>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        onChange={e => setPrice(+e.target!.value)}
                        value={price}
                        className="form-control"
                        placeholder="Enter device price"
                        type="number"
                        required
                    />
                    </div>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        onChange={e => setRating(+e.target!.value)}
                        value={rating}
                        className="mt-3"
                        placeholder="Enter device rating"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Device image"
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        onChange={selectFile}
                    />
                    <Button
                        className="mt-5 btn text-white"
                        onClick={addDeviceInfo}
                    >Add device info</Button>
                    {info.map((value: DeviceInfoT) => {
                        return (
                            <Row className="mt-2" key={value.number as Key}>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(e) => changeDeviceInfo('title', e.target.value, value.number as Date)}
                                        value={value.title as string}
                                        placeholder="Add title"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(e) => changeDeviceInfo('description', e.target.value, value.number as Date)}
                                        value={value.description as string}
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

export default DeviceModal;