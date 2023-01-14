import React, {PropsWithChildren, useContext, useState} from 'react';
import {DeviceI} from "../../store/DeviceStore";
import {Context} from "../../index";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import styles from "./AddToCart.module.css"

interface AddToCartProps extends PropsWithChildren {
    device?: Partial<DeviceI>
    quantity?: number
    id?: DeviceI['id'],
}

const AddToCart: React.FC<AddToCartProps> = observer((device: AddToCartProps) => {
    const {basket} = useContext(Context)
    const quantity = device.quantity ? device.quantity : basket.getDeviceBasketQuantityById(device?.id!)
    const [deviceQuantity, setDeviceQuantity] = useState(quantity)

    const incrementBasketDevice = async (deviceId: DeviceI['id'], quantity = 1) => {
        const resultQuantity = await basket.incrementBasketDevice(deviceId, quantity)
        setDeviceQuantity(resultQuantity!)
    }

    const decrementBasketDevice = async (deviceId: DeviceI['id'], quantity = 1) => {
        const resultQuantity = await basket.decrementBasketDevice(deviceId, quantity)
        setDeviceQuantity(resultQuantity!)
    }

    return (
        <>
            {deviceQuantity !== 0 &&
                <section className="b-add-to-cart-wrapper">
                    <div className="b-add-to-cart d-flex">
                        <span className="input-group-btn d-inline-block">
                            <button
                                type="button"
                                className="quantity-left-minus btn btn-danger btn-number"
                                onClick={() => {
                                    decrementBasketDevice(device?.device?.id!)
                                }}
                            >
                                <span className="bi bi-dash"></span>
                            </button>
                        </span>
                        <input type="text" id="quantity" name="quantity"
                               className={`d-inline-block ms-1 me-1 border-0 text-center ${styles['b-add-to-cart-input']}`}
                               value={deviceQuantity ?? basket.getDeviceBasketQuantityById(device?.device?.id!)}
                               disabled min="1" max="100" />
                        <span className="input-group-btn d-inline-block">
                            <button
                                type="button"
                                className="quantity-right-plus btn btn-success btn-number"
                                onClick={() => {
                                    incrementBasketDevice(device?.device?.id!)
                                }}
                            >
                                <span className="bi bi-plus"></span>
                            </button>
                        </span>
                    </div>
                </section>
            }
            {deviceQuantity === 0 && <Button onClick={() => {
                incrementBasketDevice(device?.device?.id!)
            }}>Add to cart</Button>}
        </>
    )
})

export default AddToCart;