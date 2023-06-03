import React, {PropsWithChildren, useContext, useEffect} from 'react';
import {BasketDeviceI} from "../store/BasketStore";
import BasketDeviceItem from "./BasketDeviceItem";
import {Context} from "../index";

interface BasketDeviceListProps extends PropsWithChildren {
    basketDevices?: BasketDeviceI[],
    setBasketDevices?: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
}

const BasketDeviceList: React.FC<BasketDeviceListProps> = ({basketDevices, setBasketDevices}) => {
    const {basket} = useContext(Context)


    return (
        <>
            {setBasketDevices
                ? (basketDevices && basketDevices.map((basketDevice: BasketDeviceI, index: number) => {
                    return (
                        <BasketDeviceItem key={`basket-device-item-${basketDevice.deviceId}`} basketDevice={basketDevice} index={index} basketDevices={basketDevices} setBasketDevices={setBasketDevices} />
                    )
                }))
                : (basket && basket.basketDevices?.map((basketDevice: BasketDeviceI, index: number) => {
                    return (
                        <BasketDeviceItem key={`basket-device-item-${basketDevice.deviceId}`} basketDevice={basketDevice} index={index} basketDevices={basketDevices} />
                    )
                }))
            }
        </>
    )
}

export default BasketDeviceList;