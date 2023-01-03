import React from 'react';
import {RouteI} from "../utils/Routes";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const EmptyDeviceList = () => {

    return (
        <Container className="d-flex my-5">
            <NavLink className="container" to={`/` as RouteI['path']}>{`No items. Go back?`}</NavLink>
        </Container>
    )
}

export default EmptyDeviceList;