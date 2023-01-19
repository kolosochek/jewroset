import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {CategoryI} from "../store/DeviceStore";


const Categorybar = observer(() => {
    const {device} = useContext(Context)
    const {id} = device.selectedCategory

    return (
        <div className="flex-shrink-0 py-3 pe-3 bg-white">
            <ListGroup className="list-unstyled ps-0 shadow-sm">
                <ListGroup.Item
                    active={!device.selectedCategory.id ?? true}
                    className=""
                    role="button"
                >
                    <div
                        onClick={() => device.setSelectedCategory({id: 0, name: `All`})}
                        className={`d-block text-decoration-none ${(!device.selectedCategory.id ?? true) ? 'text-white d-block text-decoration-none' : ''}`}>All
                    </div>
                </ListGroup.Item>
                {device.categories.map((category: CategoryI) => {
                    return (
                        <ListGroup.Item
                            key={category.id}
                            active={!device.selectedCategory.id ? category.id === 0 : category.id === id}
                            className=""
                            role="button"
                        >
                            <div
                                key={category.id}
                                onClick={() => device.setSelectedCategory(category)}
                                className={`d-block text-decoration-none ${(!device.selectedCategory.id ? category.id === 0 : category.id === id) ? 'text-white d-block text-decoration-none' : ''}`}>{category.name}
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
})

export default Categorybar;