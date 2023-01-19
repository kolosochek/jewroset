import React, {useContext} from 'react';
import {Image, Figure} from "react-bootstrap";
import {DeviceI} from "../store/DeviceStore";
import {NavLink, useNavigate} from "react-router-dom";
import starImg from "../assets/star.png"
import AddToCart from "./AddToCart/AddToCart";
import {Context} from "../index";
import {BasketDeviceI} from "../store/BasketStore";


interface ItemProps {
    deviceItem: DeviceI,
    key?: number,
}

const DeviceItem = ({deviceItem}: ItemProps) => {
    const {basket} = useContext(Context)
    const {device} = useContext(Context)
    const navigate = useNavigate()
    const basketDevice:BasketDeviceI = {
        basketId: basket.id!,
        deviceId: deviceItem.id,
        device: deviceItem,
        quantity: 1,
    }

    return (
        <section className="b-device-item-wrapper col border-0">
            <div className="b-device-item card shadow-sm">
                <Figure className="b-device-item-figure-wrapper p-3 m-0 text-center"
                        onClick={() => navigate(`/device/${deviceItem.id}`)}>
                    <img
                        src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${deviceItem.img}`}
                        alt={deviceItem.name}
                        width="200"
                        height="200"
                        className="b-device-item-figure rounded"
                        role="button"
                    />
                </Figure>
                <section className="b-device-item-info-wrapper p-3">
                    <p className="text-center">
                        <a
                            role="button"
                            className="link"
                            onClick={() => {
                            const categoryParam = device.getCategoryById(deviceItem.category?.id!)
                            if (categoryParam) {
                                device.setSelectedCategory(categoryParam)
                                device.clearSelectedBrand()
                            }
                        }
                        }>{deviceItem.category?.name}</a>
                        <span>&nbsp;-&gt;&nbsp;</span>
                        <a
                            role="button"
                            className="link"
                            onClick={() => {
                            const brandParam = device.getBrandById(deviceItem.brand?.id!)
                            if (brandParam) {
                                device.setSelectedBrand(brandParam)
                            }
                        }
                        }>{deviceItem.brand!.name}</a>
                    </p>
                    <h4
                        className="text-center mb-4"
                    >
                        <NavLink
                            to={`/device/${deviceItem.id}`}
                            role="button"
                            className="text-primary text-decoration-underline cursor-pointer card-text"
                        >{deviceItem.name}</NavLink>
                    </h4>
                    <div className="d-flex justify-content-between">
                        <figure className="b-rating-wrapper m-0">
                            <span className="b-rating d-flex align-items-center">{deviceItem.rating}&nbsp;<Image src={starImg} width={15} height={15}/></span>
                        </figure>
                        <div className="b-price-wrapper">
                            <h5 className="b-device-item-price"><strong>${deviceItem.price}</strong></h5>
                        </div>
                    </div>
                </section>
                <div className="ms-auto pe-2 ps-2 pb-3">
                    <AddToCart basketDevice={basketDevice} />
                </div>
            </div>
        </section>
    );
};

export default DeviceItem;