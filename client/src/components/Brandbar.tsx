import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {ListGroup, Card} from "react-bootstrap";
import {BrandI} from "../store/DeviceStore";
import Filterbar from "./Filterbar";

const Brandbar = observer(() => {
    const {device} = useContext(Context)
    let {id} = device.selectedBrand


    return (
        <div className="col-9 d-flex">
            <ListGroup className="b-filter d-flex flex-row flex-wrap">
                <ListGroup.Item
                    className={`p-2 me-2 border-0 rounded`}
                    active={!device.selectedBrand.id ?? true}
                    role="button"
                >
                    <div
                        onClick={() => device.setSelectedBrand({id: 0, name: `All`})}
                        className={(!device.selectedBrand.id ?? true) ? "text-white text-decoration-none" : "text-decoration-none"}>All
                    </div>
                </ListGroup.Item>
                {device.brands.map((brand: BrandI) => {
                    return (
                        <ListGroup.Item
                            key={brand.id}
                            className={`p-2 me-2 border-0 rounded ${brand.id === id ? `bg-primary` : ''}`}
                            active={!device.selectedBrand.id ? brand.id === 0 : brand.id === id}
                            role="button"
                        >
                            <div
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand!)}
                                className={(!device.selectedBrand.id ? brand.id === 0 : brand.id === id) ? "text-white text-decoration-none" : "text-decoration-none"}>{brand.name}
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
})

export default Brandbar;