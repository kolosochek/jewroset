import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";


const Sidebar = observer(() => {
    const {device} = useContext(Context)
    let {id} = device.selectedCategory


    return (
            <div className="flex-shrink-0 py-3 pe-3 bg-white" >
                <ListGroup className="list-unstyled ps-0">
                    <ListGroup className="">
                        <ListGroup.Item
                            key={0}
                            active={id === 0}
                            className=""
                        >
                            <NavLink
                                key={0}
                                to={`/catalog` as RouteI['path']}
                                onClick={() => id = 0}
                                className={`d-block text-decoration-none ${id === 0 ? 'text-white d-block text-decoration-none' : ''}`}>All
                            </NavLink>
                        </ListGroup.Item>
                        {device.categories.map((category:any) => {
                            return (
                                <ListGroup.Item
                                    key={category.id}
                                    active={category.id == id}
                                    className=""
                                >
                                    <NavLink
                                        key={category.id}
                                        to={`/catalog` as RouteI['path']}
                                        onClick={() => device.setSelectedCategory(category)}
                                        className={`d-block text-decoration-none ${category.id == id ? 'text-white d-block text-decoration-none' : ''}`}>{category.name}
                                    </NavLink>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </ListGroup>
            </div>
    )
})

export default Sidebar;