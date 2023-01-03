import React, {useContext} from 'react';
import {NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Filterbar = observer(() => {
    const {device} = useContext(Context)


    return (
        <NavDropdown
            title={`Filter by: ${device.selectedFilter.type ? `${device.selectedFilter.type} ${device.selectedFilter.direction === 'none' ? '' : device.selectedFilter.direction}` : 'none'}`}
            id="basic-nav-dropdown" align="end">
            <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'price', direction: 'asc'})}>by price
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'price', direction: 'desc'})}>by price
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'rating', direction: 'asc'})}>by rating
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => device.setSelectedFilter({type: 'rating', direction: 'desc'})}>by rating
                desc</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item
                onClick={() => device.setSelectedFilter({type: 'none', direction: 'none'})}>none</NavDropdown.Item>
        </NavDropdown>
    )
})

export default Filterbar;