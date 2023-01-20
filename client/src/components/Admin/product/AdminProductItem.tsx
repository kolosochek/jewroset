import React, {PropsWithChildren} from 'react';
import {DeviceI} from "../../../store/DeviceStore";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BasketImage from "../../BasketImage/BasketImage";
import AdminProductItemActions from "./AdminProductItemActions";
import {switchTitle} from "../../../views/Personal";

interface AdminProductItemProps extends PropsWithChildren {
    device: DeviceI,
    index: number,
}

const AdminProductItem: React.FC<AdminProductItemProps> = ({device, index}) => {
    const navigate = useNavigate()
    const changeDescriptionLabelArr = ['<=', '=>']

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
                    className="col-3">
                    {device.description?.slice(0, 50)}<span
                    className="collapse"
                    id={`expandDescription${device.id}`}
                >{device.description?.slice(50, device.description?.length)}</span>
                    <a
                        role="button"
                        className="p-0 ms-1 p-1 text-decoration-none"
                        data-bs-toggle="collapse"
                        data-bs-target={`#expandDescription${device.id}`}
                        aria-expanded="false"
                        aria-controls={`expandDescription${device.id}`}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            switchTitle((e.target as HTMLAnchorElement), changeDescriptionLabelArr)
                        }}
                    >{changeDescriptionLabelArr[1]}</a>
                </Col>
                <Col className="text-center">
                    <BasketImage alt={device.name} imageUrl={device.img}/>
                </Col>
                <Col className="text-center">{device.price}</Col>
                <Col className="text-end col-2">
                    <AdminProductItemActions device={device}/>
                </Col>
            </Row>
        </>
    )
}

export default AdminProductItem;