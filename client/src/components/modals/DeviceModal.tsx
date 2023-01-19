import React, {ChangeEvent, Key, useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchCategories} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {CategoryI, BrandI, DeviceI, DeviceInfoT} from "../../store/DeviceStore";
import {AdminProductContext} from "../../views/Admin/AdminProducts";

type ValueOf<T> = T[keyof T];
type ModeT = "create" | "edit"

interface CreateDeviceModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT
}

const DeviceModal: React.FC<CreateDeviceModalProps> = observer(({show, onHide, mode}) => {
    const {device} = useContext(Context)
    const {isForceRender, setIsForceRender} = useContext(AdminProductContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [info, setInfo] = useState<DeviceInfoT[]>([])
    const [category, setCategory] = useState<CategoryI['id']>()
    //const [categories, setCategories] = useState<CategoryI[]>([])
    //const [brands, setBrands] = useState<BrandI[]>([])
    const [brand, setBrand] = useState<BrandI['id']>()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        if (!device.categories?.length) {
            fetchCategories().then(categoriesParam => device.setCategories(categoriesParam))
        }
        if (!device.brands?.length) {
            fetchBrands().then(brandsParam => device.setBrands(brandsParam))
        }

        // if modal is visible
        if (show) {
            const form: HTMLFormElement = document.querySelector('form.needs-validation')!

            if (form !== null) {
                form.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault()
                    e.stopPropagation()

                    // if form is valid
                    if (form.checkValidity()) {
                        if (mode === "create") {
                            // create new device formData with params
                            const formData = new FormData()
                            formData.append(`name`, name)
                            formData.append('price', `${price}`)
                            formData.append('description', description)
                            formData.append('rating', `${rating}`)
                            formData.append('img', file!)
                            formData.append('brandId', `${brand}`)
                            formData.append('categoryId', `${category}`)
                            formData.append('info', JSON.stringify(info))
                            // send api request to create new device
                            createDevice(formData as unknown as DeviceI).then(() => {
                                forceRender()
                                onHide()
                            })
                        } else if(mode === "edit"){

                        }
                    }

                    form.classList.add('was-validated')
                })
            }
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
                            defaultValue={device.categories[0]?.id!}
                            onChange={e => setCategory(+e.currentTarget.value)}
                            value={category}
                            className="form-control"
                            required
                        >
                            {device.categories.map((category) => {
                                return (
                                    <option value={category.id} key={category?.id}>{category?.name}</option>
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
                            defaultValue={device.brands[0]?.id!}
                            onChange={e => setBrand(+e.target.value)}
                            value={brand}
                            className="form-control"
                            required
                        >
                            {device.brands.map((brand) => {
                                return (
                                    <option value={brand.id} key={brand?.id}>{brand?.name}</option>
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
                            placeholder="Enter device rating"
                            type="number"
                            step="1"
                            min="0"
                            max="5"
                        />
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="file">Device image</Form.Label>
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
                    </div>
                    <div className="mt-5 mb-2">
                        <Button
                            className="mb-2 btn text-white"
                            onClick={addDeviceInfo}
                        >Add device info</Button>
                        {info.map((value: DeviceInfoT) => {
                            return (
                                <Row className="mt-1" key={value.number as Key}>
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
                    form="deviceForm"
                    type="submit"
                    className="text-white btn-success btn-outline-success"
                >{`${mode && mode === 'edit' ? 'Change' : 'Create'} device`}</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
})

    export default DeviceModal;