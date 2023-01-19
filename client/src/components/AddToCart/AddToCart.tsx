import React, {PropsWithChildren, useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import styles from "./AddToCart.module.css"
import BasketStore, {BasketDeviceI, decrementBasketDevice, incrementBasketDevice} from "../../store/BasketStore";
import {Context} from "../../index";

interface AddToCartProps extends PropsWithChildren {
    basketDevice: BasketDeviceI,
    basketDevices?: BasketDeviceI[],
    setBasketDevices?: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void,
}

const AddToCart: React.FC<AddToCartProps> = observer(({basketDevice, basketDevices, setBasketDevices}) => {
    const {basket} = useContext(Context)
    const [deviceQuantity, setDeviceQuantity] = useState<BasketDeviceI['quantity']>(setBasketDevices && basketDevices ? basketDevice.quantity : basket.getDeviceBasketQuantityById(basketDevice.device?.id!))

    const getBasketDeviceIndex = () => {
        let index = -1
        for (let [i, item] of basketDevices!.entries()) {
            if (item.deviceId === basketDevice.deviceId) {
                index = i
            }
        }
        return index
    }

    const incrementDevice = (basketDevice: BasketDeviceI) => {
        incrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
            basketDevice.quantity += 1
            setDeviceQuantity(basketDevice.quantity)
            if (basketDevices && setBasketDevices) {
                const index = getBasketDeviceIndex()
                const newBasketDevicesArr = [...basketDevices]
                newBasketDevicesArr[index] = basketDevice
                setBasketDevices(newBasketDevicesArr)
            }
        })
    }

    const decrementDevice = (basketDevice: BasketDeviceI) => {
        decrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
            basketDevice.quantity -= 1
            setDeviceQuantity(basketDevice.quantity)
            if (basketDevices && setBasketDevices) {
                const index = getBasketDeviceIndex()
                const newBasketDevicesArr = [...basketDevices]
                newBasketDevicesArr[index] = basketDevice
                setBasketDevices(newBasketDevicesArr)
            }
        })
    }

    return (
        <>
            {deviceQuantity > 0
                ? (<section className="b-add-to-cart-wrapper">
                    <div className="b-add-to-cart d-flex">
                        <span className="input-group-btn d-inline-block">
                            <button
                                type="button"
                                className="quantity-left-minus btn btn-danger btn-number"
                                onClick={() => {
                                    if (setBasketDevices) {
                                        decrementDevice(basketDevice)
                                    } else {
                                        setDeviceQuantity(deviceQuantity - 1)
                                        basket.decrementBasketDevice(basketDevice.deviceId).then(() => {
                                        })
                                    }
                                }}
                            >
                                <span className="bi bi-dash"></span>
                            </button>
                        </span>
                        <input type="text" id="quantity" name="quantity"
                               className={`d-inline-block ms-1 me-1 border-0 text-center ${styles['b-add-to-cart-input']}`}
                               value={deviceQuantity ?? basket!.getDeviceBasketQuantityById(basketDevice.device?.id!)}
                               disabled min="1" max="100"/>
                        <span className="input-group-btn d-inline-block">
                            <button
                                type="button"
                                className="quantity-right-plus btn btn-success btn-number"
                                onClick={() => {
                                    if (setBasketDevices) {
                                        incrementDevice(basketDevice)
                                    } else {
                                        basket.incrementBasketDevice(basketDevice.deviceId).then(() => {
                                            setDeviceQuantity(deviceQuantity + 1)
                                        })
                                    }
                                }}
                            >
                                <span className="bi bi-plus"></span>
                            </button>
                        </span>
                    </div>
                </section>)
                : (<Button onClick={() => {
                    if (setBasketDevices) {
                        incrementDevice(basketDevice)
                    } else {
                        basket.incrementBasketDevice(basketDevice.deviceId).then(() => {
                            setDeviceQuantity(deviceQuantity + 1)
                        })
                    }
                }}>Add to cart</Button>)
            }
        </>
    )
})

export default AddToCart;