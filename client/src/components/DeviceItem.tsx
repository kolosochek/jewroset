import React from 'react';
import {Button, Card, Image, Row} from "react-bootstrap";
import {SERVER_URL, SERVER_PORT} from "../utils/Const"
import {DeviceI} from "../store/DeviceStore";
import {NavLink, useNavigate} from "react-router-dom";
import starImg from "../assets/star.png"

interface ItemProps {
    device: DeviceI,
    key?: number,
}

const DeviceItem = ({device}: ItemProps) => {
    const navigate = useNavigate()


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
                    <Button>Add to cart</Button>
                </Card>
            </div>
        </Card>
    );
};

export default DeviceItem;