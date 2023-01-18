import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import BasketImage from "./BasketImage/BasketImage";
import AddToCart from "./AddToCart/AddToCart";
import BasketStore, {BasketDeviceI, removeBasketDevice} from "../store/BasketStore";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

interface BasketDeviceItemProps extends PropsWithChildren{
    basketDevice: BasketDeviceI,
    index: number
    basketDevices?: BasketDeviceI[],
    setBasketDevices?: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
}
const BasketDeviceItem:React.FC<BasketDeviceItemProps> = observer(({basketDevice, index, basketDevices, setBasketDevices}) => {
    const {basket} = useContext(Context)


    return (
        <>
            <Row key={basketDevice.device?.id} className={`align-items-center ${index % 2 ? 'bg-light' : ''}`}>
                <Col>{++index}</Col>
                <Col className="col-3"><Link to={`/device/${basketDevice.device?.id}`}>{basketDevice.device?.name}</Link></Col>
                <Col className="text-center">
                    <BasketImage imageUrl={basketDevice.device?.img!}/>
                </Col>
                <Col className="text-center">
                    <AddToCart
                        basketDevice={basketDevice}
                        basketDevices={basketDevices}
                        setBasketDevices={setBasketDevices}
                    />
                </Col>
                <Col className="text-center">{basketDevice.device?.price}</Col>
                <Col className="text-center"><strong>{basketDevice.device?.price! * basketDevice.quantity!}</strong></Col>
                <Col
                    className="text-end bi bi-x-circle"
                    onClick={() => {
                        // Basket View mode
                        if (basket) {
                            removeBasketDevice(basketDevice.basketId!, basketDevice.deviceId!).then(basketParam => {
                                basket.setBasket(basketParam)
                            })
                            // Admin order view mode
                        } else {
                            removeBasketDevice(basketDevice.basketId!, basketDevice.deviceId!).then(() => {
                                if (setBasketDevices){
                                    setBasketDevices(basketDevices!.filter(device => device !== basketDevice))
                                }
                            })
                        }
                    }}
                ></Col>
            </Row>
        </>
    )
})

export default BasketDeviceItem;