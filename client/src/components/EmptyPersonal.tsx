import React from 'react';
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Container} from "react-bootstrap";

const EmptyCart = () => {
    return (
        <Container className="d-flex my-3 p-0 justify-content-center">
            <h5 className="text-center">No items.&nbsp;
                <NavLink className="link" to={`/` as RouteI['path']}>{`Go back?`}</NavLink>
            </h5>
        </Container>
    )
}

export default EmptyCart;