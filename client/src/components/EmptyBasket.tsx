import React from 'react';
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Container} from "react-bootstrap";

const EmptyBasket = () => {
    return (
        <Container className="d-flex my-5">
            <NavLink className="container" to={`/` as RouteI['path']}>{`No items. Go back?`}</NavLink>
        </Container>
    )
}

export default EmptyBasket;