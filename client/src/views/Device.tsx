import React, {Key, useEffect, useState} from 'react';
import {SERVER_URL, SERVER_PORT} from "../utils/Const"
import {Button, Card, Image, Row, Container} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import {DeviceI, DeviceInfoT} from "../store/DeviceStore";

interface DeviceViewProps extends React.PropsWithChildren {
    children?: React.ReactNode
}

const Device = (props: DeviceViewProps) => {
    const [device, setDevice] = useState({info: []} as Partial<DeviceI>)
    const {id} = useParams()


    useEffect(() => {
        fetchOneDevice(+id!).then(data => setDevice(data))
    }, [])

    return (
        <Card className="b-device-wrapper card border-0">
            <div className="container-fliud">
                <div className="b-device wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active" id="pic-1">
                                <Image src={`${SERVER_URL}:${SERVER_PORT}/${device?.img}`}/>
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
                        {device.info!.map((info: DeviceInfoT , index) => {
                                return (
                                    <>
                                        <Row key={info.id as Key} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>{`${info.title}: ${info.description}`}</Row>
                                    </>
                                )
                            }
                        )}
                        </Container>
                        <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                            cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
                        <h4 className="price">current price: <span>${device?.price}</span></h4>
                        <div className="b-device-action">
                            <Button className="add-to-cart btn btn-default" type="button">add to cart</Button>
                            <Button className="add-to-cart btn btn-default" type="button">buy now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Device;