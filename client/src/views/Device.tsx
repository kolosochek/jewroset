import React from 'react';
import { SERVER_URL, SERVER_PORT } from "../utils/Const"
import {Button, Card, Image} from "react-bootstrap";

const Device = () => {
    const device = {id: 1, name: "Apple Iphone 13 Pro Max", price: 1190, rating: 0, img: "ca6c8b50-97a4-415d-8ba4-5d4b4101a5f5.jpg", categoryId: 2, brandId:2}

    return (
        <Card className="b-device-wrapper card border-0">
            <div className="container-fliud">
                <div className="b-device wrapper row">
                    <div className="preview col-md-6">
                        <div className="preview-pic tab-content">
                            <div className="tab-pane active" id="pic-1">
                                <Image src={`${SERVER_URL}:${SERVER_PORT}/${device.img}`}/>
                            </div>
                        </div>

                    </div>
                    <div className="details col-md-6">
                        <h3 className="product-title">{device.name}</h3>
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
                        <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
                            cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
                        <h4 className="price">current price: <span>${device.price}</span></h4>
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