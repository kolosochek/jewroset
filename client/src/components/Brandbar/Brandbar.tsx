import React, {useContext, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup, Card} from "react-bootstrap";
import {BrandI} from "../../store/DeviceStore";
import styles from "./index.module.css"

const Brandbar = observer(() => {
    const {device} = useContext(Context)
    const {id} = device.selectedBrand
    const brands = device.selectedCategory.id ? device.brands.filter((brand) => device.selectedCategory.id === brand.categoryId) : device.brands
    const brandList = useRef([{name: `All`, id: 0}, ...brands])

    return (
        <div className="col-9 d-flex">
            <ListGroup className={`b-filter d-flex flex-row flex-wrap`}>
                {brandList.current && brandList.current.map((brand: BrandI) => {
                    const isActive = !device.selectedBrand.id ? brand.id === 0 : brand.id === id

                    return (
                        <ListGroup.Item
                            key={brand.id}
                            className={`b-brandbar-item-wrapper ${styles['b-brandbar-item-wrapper']} p-2 me-2 border-0 rounded ${isActive ? `bg-primary ${styles['state__active']}` : ''}`}
                            active={isActive}
                            role="button"
                        >
                            <a
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand)}
                                className={`b-brandbar-item ${styles['b-brandbar-item']} b-link text-decoration-none ${isActive ? `text-white ` : ""}`}>{brand.name}
                            </a>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
})

export default Brandbar;