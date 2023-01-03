import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {CategoryI} from "../store/DeviceStore";


const Sidebar = observer(() => {
    const {device} = useContext(Context)
    const {id} = device.selectedCategory
    const categories = device.categories.flat()
    categories.unshift({id: 0, name: `All`})

    const isCategoryI = (category: CategoryI): category is CategoryI => {
        return true
    }

    return (
        <div className="flex-shrink-0 py-3 pe-3 bg-white">
            <ListGroup className="list-unstyled ps-0">
                {categories.map((category: FlatArray<[CategoryI] | undefined, 1>) => {
                    if (isCategoryI(category!)) {
                        return (
                            <ListGroup.Item
                                key={category.id}
                                active={!device.selectedCategory.id ? category.id === 0 : category.id === id}
                                className=""
                            >
                                <div
                                    key={category.id}
                                    onClick={() => device.setSelectedCategory(category)}
                                    className={`d-block text-decoration-none ${(!device.selectedCategory.id ? category.id === 0 : category.id === id) ? 'text-white d-block text-decoration-none' : ''}`}>{category.name}
                                </div>
                            </ListGroup.Item>
                        )
                    }
                })}
            </ListGroup>
        </div>
    )
})

export default Sidebar;