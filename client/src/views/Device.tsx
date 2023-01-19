import React, {Key, useContext, useEffect, useState} from 'react';
import {Card, Image, Row, Col, Container, Spinner} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPI";
import {useNavigate, useParams} from "react-router-dom";
import {DeviceI, DeviceInfoT} from "../store/DeviceStore";
import {Context} from "../index";
import AddToCart from "../components/AddToCart/AddToCart";
import {RouteI} from "../utils/Routes";
import {BasketDeviceI} from "../store/BasketStore";

interface DeviceViewProps extends React.PropsWithChildren {

}

const Device: React.FC<DeviceViewProps> = ({}) => {
    const {basket} = useContext(Context)
    const navigate = useNavigate()
    const {id} = useParams()
    const [device, setDevice] = useState<DeviceI>({} as DeviceI)
    const [deviceQuantity, setDeviceQuantity] = useState(basket.getDeviceBasketQuantityById(+id!))
    const [isLoading, setIsLoading] = useState(true);
    const basketDevice: BasketDeviceI = {
        basketId: basket.id!,
        deviceId: device.id,
        device: device,
        quantity: deviceQuantity
    }


    useEffect(() => {
        fetchOneDevice(+id!).then(device => {
            setDevice(device)
            setDeviceQuantity(basket.getDeviceBasketQuantityById(device?.id!))
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="b-device-wrapper card border-0">
            <div className="container-fliud">
                <div className="b-device wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active" id="pic-1">
                                <Image
                                    src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${device.img}`}/>
                            </div>
                        </div>
                    </div>
                    <div className="details col-md-6">
                        <h3 className="product-title">{device?.name}</h3>
                        <Row className="rating">
                            <div className="stars">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>

                            <p className="b-rating">rating: <span>{device?.rating}</span></p>
                        </Row>
                        <Row>
                            {device.description && <p className="product-description">{device.description}</p>}
                            <h4 className="b-price">current price: <span>${device?.price}</span></h4>
                        </Row>
                        <Row>
                            {device.info!.map((info: DeviceInfoT, index) => {
                                    return (
                                        <Row key={info.id as Key}
                                             className={`p-2 ${index % 2 === 0 ? 'transparent' : 'bg-light'}`}>
                                            <Col>{`${info.title}:`}</Col>
                                            <Col>{`${info.description}`}</Col>
                                        </Row>
                                    )
                                }
                            )}
                        </Row>
                        <Row>
                            <Col className="text-end">
                                {deviceQuantity > 0 && <AddToCart basketDevice={basketDevice}/>}
                                {!deviceQuantity && <AddToCart basketDevice={basketDevice}/>}
                            </Col>
                        </Row>
                        <Row>
                            <button
                                className="mt-3 w-100 btn btn-primary btn-lg"
                                type="submit"
                                onClick={() => navigate('/basket' as RouteI['path'])}
                            >Buy now
                            </button>
                        </Row>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Device;