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
    const brands = device.brands.flat()
    brands.unshift({id:0, name: `All`})
    const isBrandI = (brand: BrandI): brand is BrandI => {
        return true
    }

    return (
        <section className="b-filter-wrapper container p-0 d-flex">
            <div className="col-9 d-flex">
                <ListGroup className="b-filter d-flex flex-row flex-wrap">
            {brands.map((brand) => {
                if (isBrandI(brand!)){
                    return (
                        <ListGroup.Item
                            key={brand.id}
                            className={`p-2 me-2 border-0 rounded ${brand.id == id ? `bg-primary` : ''}`}
                            active={!device.selectedBrand.id ? brand.id == 0 : brand.id == id}
                        >
                            <div
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand!)}
                                className={(!device.selectedBrand.id ? brand.id == 0 : brand.id == id) ? "text-white text-decoration-none" : "text-decoration-none"}>{brand.name}
                            </div>
                        </ListGroup.Item>
                    )
                }
            })}
            </ListGroup>
            </div>
            <div className="d-flex ms-auto align-items-center">
                <Filterbar />
            </div>
        </section>
    );
})

export default Brandbar;