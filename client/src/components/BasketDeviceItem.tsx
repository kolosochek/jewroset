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
                    <BasketImage alt={basketDevice.device?.name!} imageUrl={basketDevice.device?.img!} />
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
                        // Admin order view mode
                        if (setBasketDevices) {
                            removeBasketDevice(basketDevice.basketId!, basketDevice.deviceId!).then(() => {
                                if (setBasketDevices){
                                    setBasketDevices(basketDevices!.filter(device => device !== basketDevice))
                                }
                            })
                        // Basket View mode
                        } else {
                            removeBasketDevice(basketDevice.basketId!, basketDevice.deviceId!).then(basketParam => {
                                basket.setBasket(basketParam)
                            })

                        }
                    }}
                ></Col>
            </Row>
        </>
    )
})

export default BasketDeviceItem;