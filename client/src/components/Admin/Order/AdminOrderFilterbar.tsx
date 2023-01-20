import React, {PropsWithChildren, useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import {AdminOrderFilterI} from "../../../views/Admin/AdminOrders";
import {PaginatorI} from "../../../store/DeviceStore";
interface AdminOrderFilterbarProps extends PropsWithChildren {
    orderBy: AdminOrderFilterI['orderBy'],
    setOrderBy: (value: AdminOrderFilterI['orderBy'] | ((prevVar: AdminOrderFilterI['orderBy']) => AdminOrderFilterI['orderBy'])) => void
    orderDirection: AdminOrderFilterI['orderDirection']
    setOrderDirection: (value: AdminOrderFilterI['orderDirection'] | ((prevVar: AdminOrderFilterI["orderDirection"]) => AdminOrderFilterI["orderDirection"])) => void
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void
}
const AdminOrderFilterbar:React.FC<AdminOrderFilterbarProps> = ({orderBy, setOrderBy, orderDirection, setOrderDirection, setPage}) => {

    return (
        <NavDropdown
            title={`Filter by: ${orderBy === "createdAt" ? "creation" : orderBy}, ${orderDirection}`}
            id="basic-nav-dropdown" align="end"
            className="">
            <NavDropdown.Item onClick={() => {
                setOrderBy('status')
                setOrderDirection('asc')
                setPage(1)
            }}>by status
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('status')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by status
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('createdAt')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by creation
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('createdAt')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by creation
                desc</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminOrderFilterbar;