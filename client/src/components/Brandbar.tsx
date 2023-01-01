import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {ListGroup} from "react-bootstrap";

const Brandbar = observer(() => {
    const {device} = useContext(Context)
    let {id} = device.selectedBrand


    return (
        <section className="b-filter-wrapper container p-0">
            <ListGroup className="b-filter d-flex flex-row flex-wrap">
                <ListGroup.Item
                    key={0}
                    className={`p-2 me-2 border-0 ${id === 0 ? `bg-primary p-2 me-2 rounded` : ''}`}
                >
                    <NavLink
                        key={0}
                        to={`/catalog` as RouteI['path']}
                        onClick={() => id = 0}
                        className={id === 0 ? "text-white text-decoration-none" : "text-decoration-none"}>All
                    </NavLink>
                </ListGroup.Item>
            {device.brands.map((brand) => {
                return (
                    <ListGroup.Item
                        key={brand?.id}
                        className={`p-2 me-2 border-0 ${brand?.id == id ? `bg-primary p-2 me-2 rounded` : ''}`}
                    >
                        <NavLink
                            key={brand?.id}
                            to={`/catalog` as RouteI['path']}
                            onClick={() => {
                                device.setSelectedBrand(brand!)
                            }}
                            className={brand?.id == id ? "text-white text-decoration-none" : "text-decoration-none"}>{brand?.name}
                        </NavLink>
                    </ListGroup.Item>
                )
            })}
            </ListGroup>
        </section>
    );
})

export default Brandbar;