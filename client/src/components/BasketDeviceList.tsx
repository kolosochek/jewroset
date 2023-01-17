import React, {Dispatch, PropsWithChildren, SetStateAction, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import BasketImage from "./BasketImage/BasketImage";
import AddToCart from "./AddToCart/AddToCart";
import BasketStore, {BasketDeviceI, BasketI, removeBasketDevice} from "../store/BasketStore";
import {OrderI} from "../store/OrderStore";
import BasketDeviceItem from "./BasketDeviceItem";

interface BasketDeviceListProps extends PropsWithChildren {
    basketDevices: BasketDeviceI[],
    setBasketDevices?: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
    basket?: BasketStore,
}

const BasketDeviceList: React.FC<BasketDeviceListProps> = ({basketDevices, setBasketDevices, basket}) => {

    return (
        <>
            {basketDevices.map((basketDevice: BasketDeviceI, index: number) => {
                return (
                    <BasketDeviceItem key={`basket-device-item-${index}`} basketDevice={basketDevice} index={index} basketDevices={basketDevices} setBasketDevices={setBasketDevices} />
                )
            })}
        </>
    )
}

export default BasketDeviceList;