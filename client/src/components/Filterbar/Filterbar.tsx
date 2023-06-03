import React, {useContext} from 'react';
import {NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {filterDirection, filterTitle, filterType} from "../../store/DeviceStore";
import styles from "./index.module.css"

const Filterbar = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className="d-flex">
            <NavDropdown
                title={`Filter: ${device.selectedFilter.type !== filterType[0] ? device.selectedFilter.type : filterTitle[0]} ${device.selectedFilter.direction ? device.selectedFilter.direction : filterDirection[0]}`}
                id="basic-nav-dropdown" align="end"
                className="b-filterbar-title p-2 text-primary">
                {filterType.map(type => {
                    const title = filterTitle[filterType.indexOf(type)]
                    return (
                        filterDirection.map(direction => {
                            const isActive = device.selectedFilter.type === type && device.selectedFilter.direction === direction
                            return (
                                <NavDropdown.Item
                                key={`${type}-${direction}`}
                                onClick={() => device.setSelectedFilter({type: type, direction: direction, title: title})}
                                className={`b-filterbar-item ${isActive ? `${styles['state__active']} text-white` : "text-primary"} ${styles['b-filterbar-item']}`}
                                role="button"
                                >{`by ${title} ${direction}`}</NavDropdown.Item>
                            )
                        })
                    )
                })}
            </NavDropdown>
        </div>
    )
})

export default Filterbar;