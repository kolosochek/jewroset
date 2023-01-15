import React, {useState} from 'react';
import {NavDropdown} from "react-bootstrap";

const AdminOrderFilterbar = () => {
    const [filterBy, setFilterBy] = useState('creation')
    const [filterDirection, setFilterDirection] = useState('desc')


    return (
        <NavDropdown
            title={`Filter by: ${filterBy}, ${filterDirection}`}
            id="basic-nav-dropdown" align="end"
            className="">
            <NavDropdown.Item onClick={() => {
                setFilterBy('status')
                setFilterDirection('asc')
            }}>by status
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setFilterBy('status')
                setFilterDirection('asc')
            }
            }>by status
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setFilterBy('creation')
                setFilterDirection('asc')
            }
            }>by creation
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setFilterBy('creation')
                setFilterDirection('desc')
            }
            }>by creation
                desc</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminOrderFilterbar;