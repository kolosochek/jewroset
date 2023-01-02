import React from 'react';
import {NavDropdown} from "react-bootstrap";

const Filterbar = () => {
    return (
        <NavDropdown title="Filter by: none" id="basic-nav-dropdown" align="end">
            <NavDropdown.Item href="#filter-price-asc">by price asc</NavDropdown.Item>
            <NavDropdown.Item href="#filter-price-desc">by price desc</NavDropdown.Item>
            <NavDropdown.Item href="#filter-rating-asc">by rating asc</NavDropdown.Item>
            <NavDropdown.Item href="#filter-rating-desc">by rating desc</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#filter-clear">none</NavDropdown.Item>
        </NavDropdown>
    )
}

export default Filterbar;