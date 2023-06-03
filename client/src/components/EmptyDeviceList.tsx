import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";

const EmptyDeviceList = () => {
    const {device} = useContext(Context)


    return (
        <Container className="d-flex my-3">
            <p>No items. <a
                className=""
                onClick={() => {
                    device.clearSelectedCategory()
                    device.clearSelectedBrand()
                }}
                role="button"
            >{`Clear filters?`}</a>
            </p>
        </Container>
    )
}

export default EmptyDeviceList;