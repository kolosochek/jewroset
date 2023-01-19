import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {DeviceI, DeviceInfoT} from "../../store/DeviceStore";
import SelectCountry from "../SelectCountry";
import SelectCity from "../SelectCity";
import {OrderI, orderStatusArr} from "../../store/OrderStore";
import {createOrder, updateOrder} from "../../http/orderAPI";
import {createBasket, incrementBasket} from "../../http/basketAPI";
import {BasketDeviceI, BasketI} from "../../store/BasketStore";
import {findUserData} from "../../http/userAPI";
import {switchTitle} from "../../views/Personal";
import {Context} from "../../index";


type ModeT = "create" | "edit"

interface OrderModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    order?: OrderI,
    basketDevices?: BasketDeviceI[],
    isForceParentRender: boolean,
    setIsForceParentRender: (value: boolean | ((varPrev: boolean) => boolean)) => void
}

const OrderModal: React.FC<OrderModalProps> = observer(({show, onHide, mode, order, isForceParentRender, setIsForceParentRender}) => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState(mode === 'edit' && order!.user?.email ? order!.user?.email : '')
    const [addressone, setAddressone] = useState(mode === 'edit' && order!.addressone ? order!.addressone : '')
    const [addresstwo, setAddresstwo] = useState(mode === 'edit' && order!.addresstwo ? order!.addresstwo : '')
    const [country, setCountry] = useState(mode === 'edit' && order!.country ? order!.country : undefined)
    const [city, setCity] = useState(mode === 'edit' && order!.city ? order!.city : undefined)
    const [zip, setZip] = useState(mode === 'edit' && order!.zip ? order!.zip : '')
    const [status, setStatus] = useState(mode === 'edit' && order!.status ? order!.status : 'created')
    const [deviceArr, setDeviceArr] = useState<DeviceI[]>([])
    const deviceLabelArr = mode === 'create' ? ['Collapse', 'Add device'] : ['Collapse', 'Edit devices']
    // fetch all devices
    const deviceLimit = 999;


    useEffect(() => {
        // if modal is visible
        if (show) {
            fetchDevices(undefined, undefined, undefined, undefined, undefined, deviceLimit).then((devices) => {
                setDeviceArr(devices.rows as unknown as DeviceI[])
            })

            const form: HTMLFormElement = document.querySelector('form.needs-validation')!

            if (form !== null) {
                form.addEventListener('submit', (e: SubmitEvent) => {
                    e.preventDefault()
                    e.stopPropagation()

                    // if form is valid
                    if (form.checkValidity()) {
                        // create new order params object
                        const orderObj: Partial<OrderI> = {
                            email: (form.querySelector('#email') as HTMLSelectElement).value,
                            addressone: (form.querySelector('#addressone') as HTMLInputElement).value ?? undefined,
                            addresstwo: (form.querySelector('#addresstwo') as HTMLInputElement).value ?? undefined,
                            country: (form.querySelector('#country') as HTMLSelectElement).value ?? undefined,
                            city: (form.querySelector('#city') as HTMLSelectElement).value ?? undefined,
                            zip: (form.querySelector('#zip') as HTMLInputElement).value ?? undefined,
                            status: ((form.querySelector('#status') as HTMLSelectElement).value as OrderI['status']) ?? "awaitingPayment",
                        }

                        findUserData(orderObj.email!).then((userParam) => {
                            orderObj.userId = userParam.id
                            // create new closed basket
                            createBasket(orderObj.userId!, 'closed').then((basketParam) => {
                                orderObj.basketId = basketParam.id
                                // CREATE ORDER MODE
                                if (mode === 'create') {
                                    const orderDeviceParam = (form.querySelector('select#orderDevice') as HTMLSelectElement).selectedOptions
                                    const addBasketDevices = async () => {
                                        for (let item of orderDeviceParam) {
                                            await incrementBasket(orderObj.basketId!, +item.value!)
                                        }
                                    }
                                    // let's add basketDevices to created basket
                                    addBasketDevices().then(() => {
                                        // create new order
                                        createOrder(orderObj).then(() => {
                                            setIsForceParentRender(!isForceParentRender)
                                            onHide()
                                        })
                                    })
                                // EDIT EXISTING ORDER
                                } else if (mode === 'edit') {
                                    orderObj.userId = user.id!
                                    orderObj.id = order?.id
                                    updateOrder(orderObj).then(() => {
                                        setIsForceParentRender(!isForceParentRender)
                                        onHide()
                                    })
                                }


                            }).catch((e) => {
                                console.log(`Got an error, ${e}`)
                            })

                        }).catch((e) => {
                            console.log(`Got an error, ${e}`)
                        })
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
                    Create new order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="createOrderForm" className="needs-validation" noValidate={true}>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="email">Email</Form.Label>
                        <Form.Control
                            onChange={e => setEmail(e.target!.value)}
                            value={email}
                            type="email"
                            className="form-control"
                            placeholder="some@email.com"
                            name="email"
                            id="email"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid email address.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="addressone">Address</Form.Label>
                        <Form.Control
                            onChange={e => setAddressone(e.target!.value)}
                            value={addressone}
                            placeholder="st. Main Road 1113"
                            name="addressone"
                            className="form-control"
                            id="addressone"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid address.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="addresstwo">Address 2</Form.Label>
                        <Form.Control
                            onChange={e => setAddresstwo(e.target!.value)}
                            value={addresstwo}
                            className="mb-2"
                            placeholder="apt. 881"
                            name="addresstwo"
                            id="addresstwo"
                        />
                    </div>
                    <div className="mb-2">
                        <SelectCountry className="" active={country}/>
                    </div>
                    <div className="mb-2">
                        <SelectCity className="" active={city}/>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="zip">Post code</Form.Label>
                        <Form.Control
                            onChange={e => setZip(e.target!.value)}
                            value={zip}
                            className="mb-2"
                            placeholder="PS101001"
                            name="zip"
                            id="zip"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="status">Status</Form.Label>
                        <Form.Select
                            onChange={e => setStatus(e.target!.value)}
                            value={status}
                            className="form-control"
                            placeholder="awaitingPayment"
                            name="status"
                            id="status"
                            required
                        >
                            {orderStatusArr.map((status) => {
                                return (
                                    <option key={`option-${status}`} value={status}>{status}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please select valid order status.
                        </div>
                    </div>
                    {mode === "create" && (
                        <div>
                            <Button
                                className="mt-3 btn text-white"
                                data-bs-toggle="collapse"
                                data-bs-target="#orderDevice"
                                aria-expanded="false"
                                aria-controls="orderDevice"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    switchTitle((e.target as HTMLButtonElement), deviceLabelArr)
                                }}
                            >{deviceLabelArr[1]}</Button>
                            <Form.Select
                                className="collapse card card-body mt-2 form-control"
                                id="orderDevice"
                                name="orderDevice"
                                multiple
                            >
                                {deviceArr.map((item: DeviceI) => {
                                    return (
                                        <option value={`${item.id}`} key={`option-${item.id}`}>
                                            {`${item.name} for ${item.price}$`}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="createOrderForm" type="submit" className="text-white btn-success btn-outline-success">{`
                    ${mode && mode === 'edit' ? 'Change' : 'Create'} order`}</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default OrderModal;