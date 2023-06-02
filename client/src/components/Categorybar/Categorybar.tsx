import React, {useContext, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import {CategoryI} from "../../store/DeviceStore";
import styles from "./index.module.css"


const Categorybar = observer(() => {
    const {device} = useContext(Context)
    const {id} = device.selectedCategory
    const categoryList = useRef([{name: `All`, id: 0}, ...device.categories])

    return (
        <div className="flex-shrink-0 py-3 pe-3 bg-white">
            <ListGroup className="list-unstyled ps-0 shadow-sm">
                {categoryList.current && categoryList.current.map((category: CategoryI) => {
                    return (
                        <ListGroup.Item
                            key={category.id}
                            active={!device.selectedCategory.id ? category.id === 0 : category.id === id}
                            className={`b-categorybar-item-wrapper ${styles["b-categorybar-item-wrapper"]}`}
                            role="button"
                        >
                            <a
                                key={category.id}
                                onClick={() => device.setSelectedCategory(category)}
                                className={`b-categorybar-item-wrapper b-link text-decoration-none text-break ${(!device.selectedCategory.id ? category.id === 0 : category.id === id) ? 'text-white d-block text-decoration-none' : ''}`}>{category.name}
                            </a>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
})

export default Categorybar;