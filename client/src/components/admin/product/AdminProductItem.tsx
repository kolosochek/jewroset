import React, {PropsWithChildren} from 'react';
import {DeviceI} from "../../../store/DeviceStore";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BasketImage from "../../BasketImage/BasketImage";
import AdminProductItemActions from "./AdminProductItemActions";

interface AdminProductItemProps extends PropsWithChildren {
    device: DeviceI,
    index: number,
}

const AdminProductItem: React.FC<AdminProductItemProps> = ({device, index}) => {
    const navigate = useNavigate()

    return (
        <>
            {/* order header */}
            <Row key={device.id} className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
                <Col className="col-1 text-start">{device.id}</Col>
                <Col className="col-3">
                    <a
                        className="link"
                        onClick={() => navigate(`/device/${device.id}`)}
                        role="button"
                    >{device.name}</a>
                </Col>
                <Col
                    className="col-3">{device.description?.slice(0, 50)}<button className="btn p-0 ps-1 outline-none">...</button></Col>
                <Col className="text-center">
                        <BasketImage alt={device.name} imageUrl={device.img} />
                </Col>
                <Col className="text-center">{device.price}</Col>
                <Col className="text-end col-2">
                    <AdminProductItemActions device={device} />
                </Col>
            </Row>
        </>
    )
}

export default AdminProductItem;