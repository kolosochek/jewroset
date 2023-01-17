import React, {PropsWithChildren, useState} from 'react';
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import styles from "./AddToCart.module.css"
import BasketStore, {BasketDeviceI, decrementBasketDevice, incrementBasketDevice} from "../../store/BasketStore";

interface AddToCartProps extends PropsWithChildren {
    basketDevice: BasketDeviceI,
    basket?: BasketStore,
}

const AddToCart: React.FC<AddToCartProps> = observer(({basketDevice, basket}) => {
    const [deviceQuantity, setDeviceQuantity] = useState<number>((!basket && basketDevice.quantity) ? basketDevice.quantity : basket!.getDeviceBasketQuantityById(basketDevice.device?.id!))


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
                                    decrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
                                        setDeviceQuantity(deviceQuantity-1)
                                    })
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
                                    incrementBasketDevice(basketDevice.basketId, basketDevice.deviceId).then(() => {
                                        setDeviceQuantity(deviceQuantity+1)
                                    })
                                }}
                            >
                                <span className="bi bi-plus"></span>
                            </button>
                        </span>
                    </div>
                </section>
            }
            {deviceQuantity === 0
                && (<Button onClick={() => {
                    incrementBasketDevice(basketDevice.basketId, basketDevice.deviceId)
                    setDeviceQuantity(deviceQuantity+1)
                }}>Add to cart</Button>)
            }
        </>
    )
})

export default AddToCart;