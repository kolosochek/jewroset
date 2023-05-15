import React, {PropsWithChildren, useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import {PaginatorI} from "../../../store/DeviceStore";
import {AdminProductFilterI} from "../../../views/Admin/AdminProducts";

interface AdminProductFilterbarProps extends PropsWithChildren {
    orderBy: AdminProductFilterI['orderBy'],
    setOrderBy: (value: AdminProductFilterI['orderBy'] | ((prevVar: AdminProductFilterI['orderBy']) => AdminProductFilterI['orderBy'])) => void
    orderDirection: AdminProductFilterI['orderDirection']
    setOrderDirection: (value: AdminProductFilterI['orderDirection'] | ((prevVar: AdminProductFilterI["orderDirection"]) => AdminProductFilterI["orderDirection"])) => void
    setPage: (value: PaginatorI["page"] | ((prevVar: PaginatorI["page"]) => PaginatorI["page"])) => void
}

const AdminProductFilterbar: React.FC<AdminProductFilterbarProps> = ({
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
                setOrderBy('name')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by name
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('name')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by name
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('description')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by description
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('description')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by description
                desc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('price')
                setOrderDirection('asc')
                setPage(1)
            }
            }>by price
                asc</NavDropdown.Item>
            <NavDropdown.Item onClick={() => {
                setOrderBy('price')
                setOrderDirection('desc')
                setPage(1)
            }
            }>by price
                desc</NavDropdown.Item>
        </NavDropdown>
    )
}

export default AdminProductFilterbar;