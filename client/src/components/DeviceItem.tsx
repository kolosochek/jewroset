import React from 'react';
import {Card, Image} from "react-bootstrap";
import {DeviceI} from "../store/DeviceStore";
import { SERVER_URL, SERVER_PORT } from "../utils/Const"
import {useNavigate} from "react-router-dom";
interface ItemProps {
    device: DeviceI,
    key?: number,
}
const DeviceItem = ({device}:ItemProps) => {
    const navigate = useNavigate()


    return (
        <Card className="b-device-item-wrapper col border-0" onClick={() => navigate(`/device/${device.id}`)}>
            <div className="b-device-item card shadow-sm">
                <figure className="b-device-item-figure-wrapper p-2 m-0">
                    <Image
                        src={`${SERVER_URL}:${SERVER_PORT}/${device.img}`}
                        width="150"
                        height="150"
                        className="b-device-item-figure"
                    />
                </figure>
                <div className="b-device-item-info-wrapper p-2">
                    <p className="text-primary text-decoration-underline cursor-pointer card-text">{device.name}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="b-price-wrapper">
                            <span className="b-device-item-price">${device.price}</span>
                        </div>
                        <div className="b-rating-wrapper">
                            <span className="b-rating">{device.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DeviceItem;