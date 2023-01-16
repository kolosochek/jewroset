import React, {PropsWithChildren, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import BasketImage from "./BasketImage/BasketImage";
import AddToCart from "./AddToCart/AddToCart";
import BasketStore, {BasketDeviceI, BasketI, removeBasketDevice} from "../store/BasketStore";

interface BasketDeviceListProps extends PropsWithChildren {
    basketDevices: BasketDeviceI[],
    basket?: BasketStore,
}

const BasketDeviceList: React.FC<BasketDeviceListProps> = ({basketDevices, basket}) => {
    const [basketDevicesArr, setBasketDevicesArr] = useState<BasketDeviceI[]>(basketDevices)

    return (
        <>
            {basketDevicesArr.map((item: BasketDeviceI, index: number) => {
                return (
                    <Row key={item.device?.id} className="align-items-center">
                        <Col>{++index}</Col>
                        <Col className="col-3"><Link to={`/device/${item.device?.id}`}>{item.device?.name}</Link></Col>
                        <Col className="text-center">
                            <BasketImage imageUrl={item.device?.img!}/>
                        </Col>
                        <Col className="text-center">
                            <AddToCart
                                device={item?.device!}
                                quantity={item.quantity}/>
                        </Col>
                        <Col className="text-center">{item.device?.price}</Col>
                        <Col className="text-center"><strong>{item.device?.price! * item.quantity!}</strong></Col>
                        <Col
                            className="text-end bi bi-x-circle"
                            onClick={() => {
                                if (basket) {
                                    removeBasketDevice(item.basketId!, item.deviceId!).then(basketParam => {
                                        basket.setBasket(basketParam)
                                    })
                                } else {
                                    removeBasketDevice(item.basketId!, item.deviceId!).then(() => {
                                        const newArr = basketDevicesArr.filter(basketDevice => basketDevice !== item)
                                        console.log(`newArr`)
                                        console.log(newArr)
                                        setBasketDevicesArr(newArr)
                                    })
                                }
                            }}
                        ></Col>
                    </Row>
                )
            })}
        </>
    )
}

export default BasketDeviceList;