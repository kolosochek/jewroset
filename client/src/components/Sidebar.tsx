import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Sidebar = observer(() => {
    const {device} = useContext(Context)


    return (
            <div className="flex-shrink-0 py-3 pe-3 bg-white" >
                <ListGroup className="list-unstyled ps-0">
                    <ListGroup className="">
                        {device.categories.map((category:any) => {
                            return (
                                <ListGroup.Item
                                    key={category.id}
                                    active={category.id == device.selectedCategory.id}
                                    className=""
                                >
                                    <NavLink
                                        key={category.id}
                                        to={`/category/${category.id}`}
                                        onClick={() => {device.setSelectedCategory(category)}}
                                        className={category.id == device.selectedCategory.id ? "text-white d-block text-decoration-none " : "d-block text-decoration-none "}>{category.name}
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