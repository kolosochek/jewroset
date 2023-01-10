import React, {Key, useContext, useEffect, useState} from 'react';
import {Card, Image, Row, Container, Spinner} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import {DeviceI, DeviceInfoT} from "../store/DeviceStore";
import {Context} from "../index";
import AddToCart from "../components/AddToCart";

interface DeviceViewProps extends React.PropsWithChildren {
    children?: React.ReactNode
}

const Device: React.FC<DeviceViewProps> = (props: DeviceViewProps) => {
    const {basket} = useContext(Context)
    const {id} = useParams()
    const [device, setDevice] = useState({info: []} as Partial<DeviceI>)
    const [deviceQuantity, setDeviceQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(true);


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
        <Card className="b-device-wrapper card border-0">
            <div className="container-fliud">
                <div className="b-device wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active" id="pic-1">
                                <Image src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${device.img}`}/>
                            </div>
                        </div>
                    </div>
                    <div className="details col-md-6">
                        <h3 className="product-title">{device?.name}</h3>
                        <div className="rating">
                            <div className="stars">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                            <span className="review-no">41 reviews</span>
                        </div>
                        <Container>
                            <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu
                                laudantium
                                cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus
                                posuere.</p>
                            <h4 className="price">current price: <span>${device?.price}</span></h4>
                            <h4 className="price">rating: <span>{device?.rating}</span></h4>
                        </Container>
                        <Container>
                            {device.info!.map((info: DeviceInfoT, index) => {
                                    return (
                                        <Row key={info.id as Key} style={{
                                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                                            padding: 10
                                        }}>{`${info.title}: ${info.description}`}</Row>
                                    )
                                }
                            )}
                        </Container>
                        <Container className="b-device-action py-3">
                            {deviceQuantity > 0 && <AddToCart device={device} quantity={deviceQuantity}/>}
                            {!deviceQuantity && <AddToCart device={device} />}
                        </Container>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Device;