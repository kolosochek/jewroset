import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Filterbar = observer(() => {
    const {device} = useContext(Context)


    return (
        <section className="b-filter-wrapper container p-0">
            <div className="b-filter d-flex flex-row flex-wrap">
            {device.brands.map((brand) => {
                return (
                    <div
                        key={brand.id}
                        className={brand.id == device.selectedBrand.id ? "bg-primary p-2 me-2 rounded" : "p-2 me-2"}
                    >
                        <NavLink
                            key={brand.id}
                            to={`/brand/${brand.id}`}
                            onClick={() => {
                                device.setSelectedBrand(brand)
                            }}
                            className={brand.id == device.selectedBrand.id ? "text-white text-decoration-none" : "text-decoration-none"}>{brand.name}
                        </NavLink>
                    </div>
                )
            })}
            </div>
        </section>
    );
})

export default Filterbar;