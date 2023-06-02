import React, {useContext, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup, Card} from "react-bootstrap";
import {BrandI} from "../store/DeviceStore";

const Brandbar = observer(() => {
    const {device} = useContext(Context)
    const {id} = device.selectedBrand
    const brands = device.selectedCategory.id ? device.brands.filter((brand) => device.selectedCategory.id === brand.categoryId) : device.brands
    const brandList = useRef([{name: `All`, id: 0}, ...brands])

    return (
        <div className="col-9 d-flex">
            <ListGroup className="b-filter d-flex flex-row flex-wrap">
                {brandList.current && brandList.current.map((brand: BrandI) => {
                    const isBrandSelected = !device.selectedBrand.id ? brand.id === 0 : brand.id === id

                    return (
                        <ListGroup.Item
                            key={brand.id}
                            className={`p-2 me-2 border-0 rounded ${brand.id === id ? `bg-primary` : ''}`}
                            active={isBrandSelected}
                            role="button"
                        >
                            <div
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand)}
                                className={(isBrandSelected ? brand.id === 0 : brand.id === id) ? "text-white text-decoration-none" : "text-decoration-none"}>{brand.name}
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
})

export default Brandbar;