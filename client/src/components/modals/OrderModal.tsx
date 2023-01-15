import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {fetchDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {DeviceI, DeviceInfoT} from "../../store/DeviceStore";
import SelectCountry from "../SelectCountry";
import SelectCity from "../SelectCity";
import {OrderI, orderStatusArr} from "../../store/OrderStore";
import {createOrder} from "../../http/orderAPI";
import {UserI} from "../../store/UserStore";
import {clearBasket, createBasket, incrementBasket} from "../../http/basketAPI";
import {BasketI} from "../../store/BasketStore";
import {findUserData} from "../../http/userAPI";

type ValueOf<T> = T[keyof T];
type ModeT = "create" | "edit"

interface CreateOrderModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT
}

const OrderModal: React.FC<CreateOrderModalProps> = observer(({show, onHide, mode}: CreateOrderModalProps) => {
    const [user, setUser] = useState<Partial<UserI>>({})
    const [basket, setBasket] = useState<Partial<BasketI>>({})
    const [email, setEmail] = useState('')
    const [addressone, setAddressone] = useState("")
    const [addresstwo, setAddresstwo] = useState("")
    const [zip, setZip] = useState("")
    const [status, setStatus] = useState("created")
    const [orderDevice, setOrderDevice] = useState<DeviceI[]>([])
    const [deviceArr, setDeviceArr] = useState<DeviceI[]>([])

    useEffect(() => {
        if (show) {
            fetchDevices(undefined, undefined, undefined, undefined, undefined, 999).then((devices) => {
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
                                const orderDeviceParam = (form.querySelector('select#orderDevice') as HTMLSelectElement).selectedOptions
                                //setBasket(basketParam)
                                // let's add basketDevices to created basket
                                for (let item of orderDeviceParam) {
                                    incrementBasket(orderObj.basketId!, +item.value!)
                                }
                                // debug
                                console.log(`orderObj`)
                                console.log(orderObj)
                                //
                                // create new order
                                createOrder(orderObj).then(() => {
                                    onHide()
                                })
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
                        <SelectCountry className=""/>
                    </div>
                    <div className="mb-2">
                        <SelectCity className=""/>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="addresstwo">Post code</Form.Label>
                        <Form.Control
                            onChange={e => setZip(e.target!.value)}
                            value={zip}
                            className="mb-2"
                            placeholder="PS101001"
                            name="zip"
                            id="zip"
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
                                    <option value={status}>{status}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please select valid order status.
                        </div>
                    </div>
                    <div>
                        <Button
                            className="mt-3 btn text-white"
                            data-bs-toggle="collapse"
                            data-bs-target="#orderDevice"
                            aria-expanded="false"
                            aria-controls="orderDevice"
                        >Add device</Button>
                        <Form.Select
                            className="collapse card card-body mt-2 form-control"
                            id="orderDevice"
                            name="orderDevice"
                            required
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
                        <div className="invalid-feedback mb-2">
                            Please select one or multiple devices.
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="createOrderForm" type="submit" className="text-white btn-success btn-outline-success">
                    Create order</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default OrderModal;