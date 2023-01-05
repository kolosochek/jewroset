import React, {useContext, useState} from 'react';
import {Button, Card, Image, Row} from "react-bootstrap";
import {SERVER_URL, SERVER_PORT} from "../utils/Const"
import {DeviceI} from "../store/DeviceStore";
import {NavLink, useNavigate} from "react-router-dom";
import starImg from "../assets/star.png"
import {addToBasket} from "../http/basketAPI";
import {Context} from "../index";
import {BasketI} from "../store/BasketStore";

interface ItemProps {
    device: DeviceI,
    key?: number,
}

const DeviceItem = ({device}: ItemProps) => {
    const {basket} = useContext(Context)
    const navigate = useNavigate()
    const [deviceQuantity, setDeviceQuantity] = useState(0)

    const getDeviceBasketQuantityByDeviceId = (basket: BasketI, deviceId:DeviceI['id']) => {
        if (basket.basket_devices && Array.isArray(basket.basket_devices)){
            for (let device of basket.basket_devices){
                if(+device.deviceId === deviceId){
                    return +device.quantity
                }
            }
        }
        return 0
    }

    const addToCart = async (deviceId:DeviceI['id'], quantity = 1) => {
        const updatedBasket = await addToBasket(basket.basket.id!, deviceId!, quantity)
        basket.setBasket(updatedBasket)
        const resultQuantity = getDeviceBasketQuantityByDeviceId(updatedBasket, deviceId)
        // debug
        console.log(`updatedBasket`)
        console.log(updatedBasket)
        console.log(`resultQuantity`)
        console.log(resultQuantity)
        //
        setDeviceQuantity(resultQuantity)
    }

    return (
        <Card className="b-device-item-wrapper col border-0">
            <div className="b-device-item card shadow-sm">
                <figure className="b-device-item-figure-wrapper p-2 m-0 text-center"
                        onClick={() => navigate(`/device/${device.id}`)}>
                    <Image
                        src={`${SERVER_URL}:${SERVER_PORT}/${device.img}`}
                        width="200"
                        height="200"
                        className="b-device-item-figure rounded"
                    />
                </figure>
                <Row className="b-device-item-info-wrapper p-2">
                    <p className="">{`${device.category!.name}->${device.brand!.name}`}</p>
                    <NavLink to={`/device/${device.id}`}
                             className="text-primary text-decoration-underline cursor-pointer card-text">{device.name}</NavLink>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="b-price-wrapper">
                            <span className="b-device-item-price">${device.price}</span>
                        </div>
                        <figure className="b-rating-wrapper m-0">
                            <span className="b-rating">{device.rating}&nbsp;<Image src={starImg} width={15}
                                                                                   height={15}/></span>
                        </figure>
                    </div>
                </Row>
                <Card className="me-2 ms-5 mb-3 mt-0 card border-0 ms-auto">
                    {deviceQuantity !== 0 && <span>{deviceQuantity}</span>}
                    <Button onClick={() => {addToCart(device.id)}}>Add to cart</Button>
                </Card>
            </div>
        </Card>
    );
};

export default DeviceItem;