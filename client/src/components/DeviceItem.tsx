import React, {useContext} from 'react';
import {Image, Figure} from "react-bootstrap";
import {DeviceI} from "../store/DeviceStore";
import {NavLink, useNavigate} from "react-router-dom";
import starImg from "../assets/star.png"
import AddToCart from "./AddToCart/AddToCart";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";


interface ItemProps {
    device: DeviceI,
    key?: number,
}

const DeviceItem = ({device}: ItemProps) => {
    const {basket} = useContext(Context)
    const navigate = useNavigate()
    const basketDevice:BasketDeviceI = {
        basketId: basket.id!,
        deviceId: device.id,
        device: device,
        quantity: 1,
    }

    return (
        <section className="b-device-item-wrapper col border-0">
            <div className="b-device-item card shadow-sm">
                <Figure className="b-device-item-figure-wrapper p-2 m-0 text-center"
                        onClick={() => navigate(`/device/${device.id}`)}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${device.img}`}
                        width="200"
                        height="200"
                        className="b-device-item-figure rounded"
                    />
                </Figure>
                <section className="b-device-item-info-wrapper p-2">
                    <p className="">{`${device.category!.name}->${device.brand!.name}`}</p>
                    <NavLink to={`/device/${device.id}`}
                             className="text-primary text-decoration-underline cursor-pointer card-text">{device.name}</NavLink>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="b-price-wrapper">
                            <span className="b-device-item-price">${device.price}</span>
                        </div>
                        <figure className="b-rating-wrapper m-0">
                            <span className="b-rating">{device.rating}&nbsp;<Image src={starImg} width={15} height={15}/></span>
                        </figure>
                    </div>
                </section>
                <div className="ms-auto pe-2 ps-2 pb-2">
                    <AddToCart basketDevice={basketDevice} basket={basket}/>
                </div>
            </div>
        </section>
    );
};

export default DeviceItem;