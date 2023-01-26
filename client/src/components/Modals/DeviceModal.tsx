import React, {ChangeEvent, Key, useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {adminCreateDevice, adminUpdateDevice} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {CategoryI, BrandI, DeviceI, DeviceInfoT} from "../../store/DeviceStore";
import {AdminProductContext} from "../../views/Admin/AdminProducts";
import BasketImage from "../BasketImage/BasketImage";
import {switchTitle} from "../../views/Orders";
import {getAllCategories} from "../../http/categoryAPI";
import {getAllBrands} from "../../http/brandAPI";

type ValueOf<T> = T[keyof T];
type ModeT = "create" | "edit"

interface CreateDeviceModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    deviceParam?: DeviceI,
}

const DeviceModal: React.FC<CreateDeviceModalProps> = observer(({show, onHide, mode, deviceParam}) => {
    const {device} = useContext(Context)
    const {isForceRender, setIsForceRender} = useContext(AdminProductContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [info, setInfo] = useState<DeviceInfoT[]>(mode === 'edit' ? deviceParam?.info! : [])
    const [category, setCategory] = useState<CategoryI['id']>(mode === 'edit' ? deviceParam?.category?.id! : 1)
    const [brand, setBrand] = useState<BrandI['id']>(mode === 'edit' ? deviceParam?.brand?.id! : 1)
    //const [categories, setCategories] = useState<CategoryI[]>([])
    //const [brands, setBrands] = useState<BrandI[]>([])
    const [name, setName] = useState<DeviceI['name']>(mode === 'edit' ? deviceParam?.name! : '')
    const [description, setDescription] = useState<DeviceI["description"]>(mode === 'edit' ? deviceParam?.description! : '')
    const [price, setPrice] = useState(mode === 'edit' ? deviceParam?.price! : 0)
    const [rating, setRating] = useState(mode === 'edit' ? deviceParam?.rating! : 0)
    const [file, setFile] = useState<File | null>(null)
    const changeImageLabelArr = ['Collapse', 'Change image']

    const manageDevice = () => {
        const form: HTMLFormElement = document.querySelector('form.needs-validation')!
        const deviceObj = new FormData()
        deviceObj.append(`name`, name)
        deviceObj.append('price', `${price}`)
        deviceObj.append('description', description!)
        deviceObj.append('rating', `${rating}`)
        deviceObj.append('img', file!)
        deviceObj.append('brandId', `${brand ? brand : (form.querySelector('#brand') as HTMLSelectElement).value}`)
        deviceObj.append('categoryId', `${category ? category : (form.querySelector('#category') as HTMLSelectElement).value}`)
        deviceObj.append('info', JSON.stringify(info))

        // if form is valid
        if (form.checkValidity()) {
            if (mode === 'create') {
                createNewDevice(deviceObj)
            } else if (mode === 'edit') {
                updateExistingDevice(deviceObj)
            }
        }

        form.classList.add('was-validated')

    }
    const createNewDevice = (deviceObj: FormData) => {
        // send api request to create new device
        adminCreateDevice(deviceObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const updateExistingDevice = (deviceObj: FormData) => {
        deviceObj.append(`deviceId`, `${deviceParam?.id!}`)
        // send api request to create new device
        adminUpdateDevice(deviceObj).then(() => {
            forceRender()
            onHide()
        })
    }

    useEffect(() => {
        if (!device.categories?.length) {
            getAllCategories().then(categoriesParam => device.setCategories(categoriesParam))
        }
        if (!device.brands?.length) {
            getAllBrands().then(brandsParam => device.setBrands(brandsParam))
        }
    }, [show])

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
                <Form id="deviceForm" className="needs-validation" noValidate={true}>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="category">Category</Form.Label>
                        <Form.Select
                            as="select"
                            id="category"
                            onChange={e => setCategory(+e.currentTarget.value)}
                            value={category}
                            className="form-control"
                            required
                        >
                            {device.categories.map((category) => {
                                return (
                                    <option key={category?.id} value={category.id}>{category?.name}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please choose a valid category.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="brand">Brand</Form.Label>
                        <Form.Select
                            as="select"
                            id="brand"
                            onChange={e => setBrand(+e.target.value)}
                            value={brand}
                            className="form-control"
                            required
                        >
                            {device.brands.map((brand) => {
                                return (
                                    <option key={brand?.id} value={brand.id}>{brand?.name}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please choose a valid brand.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="name">Name</Form.Label>
                        <Form.Control
                            onChange={e => setName(e.target!.value)}
                            value={name}
                            name="name"
                            className="form-control"
                            placeholder="Device name"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid device name.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="description">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            onChange={e => setDescription(e.target!.value)}
                            value={description}
                            name="description"
                            className="form-control"
                            placeholder="Long description of device benefits, characteristics and so on"
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid device name.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="price">Price</Form.Label>
                        <Form.Control
                            onChange={e => setPrice(+e.target!.value)}
                            value={price}
                            name="price"
                            className="form-control"
                            type="number"
                            min="1"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a positive price value.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="rating">Rating</Form.Label>
                        <Form.Control
                            onChange={e => setRating(+e.target!.value)}
                            value={rating}
                            name="rating"
                            className="form-control"
                            type="number"
                            step="1"
                            min="0"
                            max="5"
                        />
                        <div className="invalid-feedback mb-2">
                            Please set rating in range [0..5].
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="file">Device image</Form.Label>
                        {mode === 'edit'
                            ? (<>
                                <Row className="d-flex align-items-center mb-2">
                                    <Col className="col-8">{deviceParam?.img}</Col>
                                    <Col>
                                        <BasketImage alt={deviceParam?.name!} imageUrl={deviceParam?.img!}/>
                                    </Col>
                                    <Col className="col-3 text-end">
                                        <Button
                                            className="btn btn-primary"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#changeImage"
                                            aria-expanded="false"
                                            aria-controls="changeImage"
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                switchTitle((e.target as HTMLButtonElement), changeImageLabelArr)
                                            }}
                                        >{changeImageLabelArr[1]}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            id="changeImage"
                                            className="collapse form-control"
                                            placeholder="Device image"
                                            type="file"
                                            name="file"
                                            accept="image/png, image/gif, image/jpeg, image/webp"
                                            onChange={selectFile}
                                        />
                                        <div className="invalid-feedback mb-2">
                                            Please choose a valid device image file.
                                        </div>
                                    </Col>
                                </Row>
                            </>)
                            : (<>
                                <Form.Control
                                    className="form-control"
                                    placeholder="Device image"
                                    type="file"
                                    name="file"
                                    accept="image/png, image/gif, image/jpeg, image/webp"
                                    onChange={selectFile}
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please choose a valid device image file.
                                </div>
                            </>)
                        }
                    </div>
                    <div className="mt-5 mb-2">
                        <Button
                            className="mb-2 btn text-white"
                            onClick={addDeviceInfo}
                        >Add device info</Button>
                        {info.map((value: DeviceInfoT) => {
                            return (
                                <Row key={`device-info-${value.number ?? value.id}`} className="mt-1">
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <Form.Control
                                                onChange={(e) => changeDeviceInfo('title', e.target.value, value.number as Date)}
                                                value={value.title as string}
                                                placeholder="Add title"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Please enter device info title.
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-1">
                                            <Form.Control
                                                onChange={(e) => changeDeviceInfo('description', e.target.value, value.number as Date)}
                                                value={value.description as string}
                                                placeholder="Add description"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Please enter device info description.
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            onClick={() => removeDeviceInfo(Number(value.number))}
                                            className="btn text-white btn-warning"
                                        >Remove</Button>
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="text-white btn-success btn-outline-success"
                    onClick={manageDevice}
                >{`${mode && mode === 'edit' ? 'Change' : 'Create'} device`}</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeviceModal;