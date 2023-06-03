import React, {useContext} from 'react';
import {Image, Figure} from "react-bootstrap";
import {DeviceI} from "../../store/DeviceStore";
import {NavLink, useNavigate} from "react-router-dom";
import starImg from "../../assets/star.png"
import starImgNobg from "../../assets/star_no_bg.png"
import AddToCart from "../AddToCart/AddToCart";
import {Context} from "../../index";
import {BasketDeviceI} from "../../store/BasketStore";
import styles from "./index.module.css"
import {getStaticPath} from "../../utils";


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
        <section className={`b-device-item-wrapper col border-0 mb-3 ${styles["b-device-item-wrapper"]}`}>
            <div className={`b-device-item card shadow-sm ${styles["b-device-item"]}`}>
                <Figure
                    className={`b-device-item-figure-wrapper p-3 m-0 text-center ${styles["b-device-item-figure-wrapper"]}`}
                    onClick={() => navigate(`/device/${deviceItem.id}`)}>
                    <img
                        src={`${getStaticPath()}/${deviceItem.img}`}
                        alt={deviceItem.name}
                        height="200"
                        className="b-device-item-figure rounded"
                        role="button"
                    />
                </Figure>
                <section className={`b-device-item-info-wrapper p-3`}>
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
                        style={{minHeight: '2.4em'}}
                    >
                        <NavLink
                            to={`/device/${deviceItem.id}`}
                            role="button"
                            className="text-primary text-decoration-underline cursor-pointer card-text"
                        >{deviceItem.name}</NavLink>
                    </h4>
                    <div className="d-flex justify-content-between align-items-center">
                        <figure className="d-flex b-rating-wrapper m-0">
                            <h5 className="b-rating d-flex align-items-center m-0 p-0">{deviceItem.rating}<Image className="ms-1" src={!deviceItem.rating ? starImgNobg : starImg} width={16} height={16}/></h5>
                        </figure>
                        <div className="d-flex b-price-wrapper">
                            <h3 className="b-device-item-price m-0 p-0">
                                <strong>${deviceItem.price}</strong>
                            </h3>
                        </div>
                    </div>
                </section>
                <div className="pe-3 ps-3 pb-3">
                    <AddToCart basketDevice={basketDevice} />
                </div>
            </div>
        </section>
    );
};

export default DeviceItem;