import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";

const EmptyDeviceList = () => {
    const {device} = useContext(Context)


    return (
        <Container className="d-flex my-5">
            <p>No items.<a
                className="container"
                onClick={() => {
                    device.clearSelectedCategory()
                    device.clearSelectedBrand()
                }}
            >{`Clear filters?`}</a>
            </p>
        </Container>
    )
}

export default EmptyDeviceList;