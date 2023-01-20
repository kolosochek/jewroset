import React, {useContext} from 'react';
import {NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Filterbar = observer(() => {
    const {device} = useContext(Context)


    return (
        <div className="d-flex ms-auto align-items-center">
            <NavDropdown
                title={`Filter by: ${device.selectedFilter.type ? `${device.selectedFilter.type === 'id' ? 'creation' : `${device.selectedFilter.type}` } ${!device.selectedFilter.direction ? 'desc' : device.selectedFilter.direction}` : 'creation desc'}`}
                id="basic-nav-dropdown" align="end"
                className="">
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'id', direction: 'asc'})}>by creation
                    asc</NavDropdown.Item>
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'id', direction: 'desc'})}>by creation
                    desc</NavDropdown.Item>
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'price', direction: 'asc'})}>by price
                    asc</NavDropdown.Item>
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'price', direction: 'desc'})}>by price
                    desc</NavDropdown.Item>
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'rating', direction: 'asc'})}>by rating
                    asc</NavDropdown.Item>
                <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'rating', direction: 'desc'})}>by
                    rating
                    desc</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
})

export default Filterbar;