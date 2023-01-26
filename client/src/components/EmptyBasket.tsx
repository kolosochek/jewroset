import React from 'react';
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Container} from "react-bootstrap";

const EmptyBasket = () => {
    return (
        <Container className="d-flex my-5 p-0">
            <h5>
                <NavLink className="link" to={`/` as RouteI['path']}>{`No items. Go back?`}</NavLink>
            </h5>
        </Container>
    )
}

export default EmptyBasket;