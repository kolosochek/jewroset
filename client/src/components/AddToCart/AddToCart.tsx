import {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import styles from "./AddToCart.module.css"
import {BasketDeviceI, decrementBasketDevice, incrementBasketDevice} from "../../store/BasketStore";
import {Context} from "../../index";

type CartFunctionT = (basketDevices:AddToCartPropsI["basketDevices"], basketDevice: AddToCartPropsI["basketDevice"], setDeviceQuantity:AddToCartPropsI['setDeviceQuantity'], setBasketDevices:AddToCartPropsI['setBasketDevices']) => void

const getBasketDeviceIndex = (basketDevices:AddToCartPropsI["basketDevices"], basketDevice:AddToCartPropsI["basketDevice"]) => {
    let index = -1
    for (let [i, item] of basketDevices!.entries()) {
        if (item.deviceId === basketDevice.deviceId) {
            index = i
        }
    }
    return index
}

const incrementDevice:CartFunctionT = (basketDevices, basketDevice, setDeviceQuantity, setBasketDevices) => {
    incrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
        basketDevice.quantity += 1
        setDeviceQuantity!(basketDevice.quantity)
        if (basketDevices && setBasketDevices) {
            const index = getBasketDeviceIndex(basketDevices, basketDevice)
            const newBasketDevicesArr = [...basketDevices]
            newBasketDevicesArr[index] = basketDevice
            setBasketDevices(newBasketDevicesArr)
        }
    })
}

const decrementDevice:CartFunctionT = (basketDevices, basketDevice, setDeviceQuantity, setBasketDevices) => {
    decrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
        basketDevice.quantity -= 1
        setDeviceQuantity!(basketDevice.quantity)
        if (basketDevices && setBasketDevices) {
            const index = getBasketDeviceIndex(basketDevices, basketDevice)
            const newBasketDevicesArr = [...basketDevices]
            newBasketDevicesArr[index] = basketDevice
            setBasketDevices(newBasketDevicesArr)
        }
    })
}

interface AddToCartPropsI {
    basketDevice: BasketDeviceI,
    basketDevices?: BasketDeviceI[],
    setBasketDevices?: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void,
    setDeviceQuantity?: (value: BasketDeviceI['quantity'] | ((prevVar: BasketDeviceI['quantity']) => BasketDeviceI['quantity'])) => void,
    className?: string
}

const AddToCart = observer(({basketDevice, basketDevices, setBasketDevices, className} : AddToCartPropsI) => {
    const {basket} = useContext(Context)
    const [deviceQuantity, setDeviceQuantity] = useState<BasketDeviceI['quantity']>(setBasketDevices && basketDevices ? basketDevice.quantity : basket.getDeviceBasketQuantityById(basketDevice.device?.id!))

    return (
        <>
            {deviceQuantity > 0
                ? (<section className="b-add-to-cart-wrapper">
                    <div className={`b-add-to-cart justify-content-center ${className ? className : 'd-flex'}`}>
                        <span className="input-group-btn d-inline-block">
                            <button
                                type="button"
                                className="quantity-left-minus btn btn-danger btn-number"
                                onClick={() => {
                                    if (setBasketDevices) {
                                        decrementDevice(basketDevices, basketDevice, setDeviceQuantity, setBasketDevices)
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
                                        incrementDevice(basketDevices, basketDevice, setDeviceQuantity, setBasketDevices)
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
                : (<Button
                    className="w-100"
                    onClick={() => {
                    if (setBasketDevices) {
                        incrementDevice(basketDevices, basketDevice, setDeviceQuantity, setBasketDevices)
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