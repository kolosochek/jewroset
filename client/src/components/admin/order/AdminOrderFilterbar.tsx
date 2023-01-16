import React, {useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import {AdminOrderFilterI} from "../../../views/Admin/AdminOrders";

const AdminOrderFilterbar = () => {
    const [orderBy, setOrderBy] = useState<AdminOrderFilterI['orderBy']>('creation')
    const [orderDirection, setOrderDirection] = useState<AdminOrderFilterI['orderDirection']>('desc')


    return (
        <NavDropdown
            title={`Filter by: ${orderBy}, ${orderDirection}`}
            id="basic-nav-dropdown" align="end"
            className="">
            <NavDropdown.Item onClick={() => {
                setOrderBy('status')
                setOrderDirection('asc')
            }}>by status
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('status')
                setOrderDirection('asc')
            }
            }>by status
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('creation')
                setOrderDirection('asc')
            }
            }>by creation
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('creation')
                setOrderDirection('desc')
            }
            }>by creation
                desc</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminOrderFilterbar;