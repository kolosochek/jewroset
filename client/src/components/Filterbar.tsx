import React, {useContext} from 'react';
import {NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Filterbar = observer(() => {
    const {device} = useContext(Context)

    return (
        <div className="d-flex col-3 ms-auto align-items-end">
            <NavDropdown
                title={`Filter by: ${device.selectedFilter.type ? `${device.selectedFilter.type === 'id' ? 'creation' : `${device.selectedFilter.type}` } ${!device.selectedFilter.direction ? 'desc' : device.selectedFilter.direction}` : 'creation desc'}`}
                id="basic-nav-dropdown" align="end"
                className="p-2">
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'id', direction: 'asc'})}
                    className={device.selectedFilter.type === 'id' && device.selectedFilter.direction === "asc" ? "state__active" : ""}
                >by creation
                    asc</NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'id', direction: 'desc'})}
                    className={!device.selectedFilter.type ? "state__active" : device.selectedFilter.type === 'id' && device.selectedFilter.direction === "desc" ? "state__active" : ""}
                >by creation
                    desc</NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'price', direction: 'asc'})}
                    className={device.selectedFilter.type === 'price' && device.selectedFilter.direction === "asc" ? "state__active" : ""}
                >by price
                    asc</NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'price', direction: 'desc'})}
                    className={device.selectedFilter.type === 'price' && device.selectedFilter.direction === "desc" ? "state__active" : ""}
                >by price
                    desc</NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'rating', direction: 'asc'})}
                    className={device.selectedFilter.type === 'rating' && device.selectedFilter.direction === "asc" ? "state__active" : ""}
                >by rating
                    asc</NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => device.setSelectedFilter({type: 'rating', direction: 'desc'})}
                    className={device.selectedFilter.type === 'rating' && device.selectedFilter.direction === "desc" ? "state__active" : ""}
                >by
                    rating
                    desc</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
})

export default Filterbar;