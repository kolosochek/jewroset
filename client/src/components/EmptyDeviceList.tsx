import React from 'react';
import {RouteI} from "../utils/Routes";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const EmptyDeviceList = () => {
    const navigator = useNavigate()

    return (
        <Container className="d-flex">
            <h3 className="container">No items. <a
                className=""
                onClick={() => navigator('/' as RouteI['path'])}
            >Go back?</a>
            </h3>
        </Container>
    )
}

export default EmptyDeviceList;