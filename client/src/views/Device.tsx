import React, {Key, useContext, useEffect, useState} from 'react';
import {Image, Row, Col, Spinner} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPI";
import {useNavigate, useParams} from "react-router-dom";
import {DeviceI, DeviceInfoT} from "../store/DeviceStore";
import {Context} from "../index";
import AddToCart from "../components/AddToCart/AddToCart";
import {RouteI} from "../utils/Routes";
import {BasketDeviceI} from "../store/BasketStore";
import ReactMarkdown from 'react-markdown'
import {Loader} from "../components/Loader/Loader";
import {getStaticPath} from "../utils";

const Device = ({}) => {
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

    const buyNow = () => {
        if (basket.getDeviceBasketQuantityById(+id!) === 0) {
            basket.incrementBasketDevice(device.id)
        }
        navigate('/basket' as RouteI['path'])
    }


    useEffect(() => {
        fetchOneDevice(+id!).then(device => {
            setDevice(device)
            setDeviceQuantity(basket.getDeviceBasketQuantityById(device?.id!))
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="b-device-wrapper card border-0 pt-5 pb-5">
            <div className="container-fliud">
                <div className="b-device wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="text-center mb-5">
                                <Image
                                    src={`${getStaticPath()}/${device.img}`}
                                    alt={device.name}
                                    width={300}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="details col-md-6">
                        <h2 className="product-title">{device?.name}</h2>
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
                            {device.description && <div id="description">
                                <div className="product-description">
                                    <ReactMarkdown children={device.description!}/>
                                </div>
                            </div>}
                        </Row>
                        <Row>
                            {device.info!.map((info: DeviceInfoT, index) => {
                                    return (
                                        <Row key={info.id as Key}
                                             className={`p-2 ${index % 2 === 0 ? 'transparent' : 'bg-light'}`}>
                                            <Col>{`${info.title}:`}</Col>
                                            <Col className="text-end">{`${info.description}`}</Col>
                                        </Row>
                                    )
                                }
                            )}
                        </Row>
                        <Row className="pt-3 pb-3 align-items-center">
                            <Col className="text-start">
                                <p>current price: <h4 className="b-price"><span>${device?.price}</span></h4></p>
                            </Col>
                            <Col className="text-end">
                                {deviceQuantity > 0 && <AddToCart basketDevice={basketDevice} className="d-block"/>}
                                {!deviceQuantity && <AddToCart basketDevice={basketDevice} className="d-block"/>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button
                                    className="mt-3 w-100 btn btn-primary btn-lg"
                                    type="submit"
                                    onClick={() => {
                                        buyNow()
                                    }}
                                >Buy now
                                </button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Device;