import React, {PropsWithChildren, useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import {PaginatorI} from "../../../store/DeviceStore";
import {AdminClientFilterI} from "../../../views/Admin/AdminClients";

interface AdminClientFilterbarProps extends PropsWithChildren {
    orderBy: AdminClientFilterI['orderBy'],
    setOrderBy: (value: AdminClientFilterI['orderBy'] | ((prevVar: AdminClientFilterI['orderBy']) => AdminClientFilterI['orderBy'])) => void
    orderDirection: AdminClientFilterI['orderDirection']
    setOrderDirection: (value: AdminClientFilterI['orderDirection'] | ((prevVar: AdminClientFilterI["orderDirection"]) => AdminClientFilterI["orderDirection"])) => void
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void
}

const AdminClientFilterbar: React.FC<AdminClientFilterbarProps> = ({
                                                                         orderBy,
                                                                         setOrderBy,
                                                                         orderDirection,
                                                                         setOrderDirection,
                                                                         setPage
                                                                     }) => {

    return (
        <NavDropdown
            title={`Filter by: ${orderBy === "id" ? "id" : orderBy}, ${orderDirection}`}
            id="basic-nav-dropdown" align="end"
            className="">
            <NavDropdown.Item onClick={() => {
                setOrderBy('id')
                setOrderDirection('asc')
                setPage(1)
            }}>by id
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('id')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by id
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('email')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by email
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('email')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by email
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('firstname')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by first name
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('firstname')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by first name
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('lastname')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by last name
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('lastname')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by last name
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('role')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by role
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('role')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by role
                desc</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminClientFilterbar;