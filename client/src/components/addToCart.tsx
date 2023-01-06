import React, {PropsWithChildren, useContext, useState} from 'react';
import {DeviceI} from "../store/DeviceStore";
import {Context} from "../index";
import {Button, Card} from "react-bootstrap";

interface AddToCartProps extends PropsWithChildren{
    device?: Partial<DeviceI>
    quantity?: number
    id?: DeviceI['id'],
}
const AddToCart:React.FC<AddToCartProps> = (device:AddToCartProps) => {
    const {basket} = useContext(Context)
    const quantity = device.quantity ? device.quantity : basket.getDeviceBasketQuantityById(device?.id!)
    const [deviceQuantity, setDeviceQuantity] = useState(quantity)

    // debug
    console.log(`quantity`)
    console.log(quantity)
    console.log(`deviceQuantity`)
    console.log(deviceQuantity)
    //


    const incrementBasketDevice = async (deviceId:DeviceI['id'], quantity = 1) => {
        const resultQuantity = await basket.incrementBasketDevice(deviceId, quantity)
        setDeviceQuantity(resultQuantity!)
    }

    const decrementBasketDevice = async (deviceId:DeviceI['id'], quantity = 1) => {
        const resultQuantity = await basket.decrementBasketDevice(deviceId, quantity)
        setDeviceQuantity(resultQuantity!)
    }

    return (
        <Card className="me-2 ms-5 mb-3 mt-0 card border-0 ms-auto">
            {deviceQuantity !== 0 &&
                <div className="ms-auto col-5">
                    <div className="input-group">
                                    <span className="input-group-btn">
                                        <button
                                            type="button"
                                            className="quantity-left-minus btn btn-danger btn-number"
                                            onClick={() => {decrementBasketDevice(device?.device?.id!)}}
                                        >
                                          <span className="bi bi-dash"></span>
                                        </button>
                                    </span>
                        <input type="text" id="quantity" name="quantity" className="form-control input-number ms-1 me-1 border-0"
                               value={deviceQuantity ?? basket.getDeviceBasketQuantityById(device?.device?.id!)} disabled min="1" max="100" />
                        <span className="input-group-btn">
                                        <button
                                            type="button"
                                            className="quantity-right-plus btn btn-success btn-number"
                                            onClick={() => {incrementBasketDevice(device?.device?.id!)}}
                                        >
                                            <span className="bi bi-plus"></span>
                                        </button>
                                    </span>
                    </div>
                </div>
            }
            {deviceQuantity === 0 && <Button onClick={() => {incrementBasketDevice(device?.device?.id!)}}>Add to cart</Button>}
        </Card>
    )
}

export default AddToCart;