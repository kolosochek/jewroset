import React from 'react';
import {Button, NavLink, Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {DeviceI} from "../store/DeviceStore";
import EmptyDeviceList from "./EmptyDeviceList";


interface CategoryProps {
    categoryItems: DeviceI[]
}

const DeviceList = ({categoryItems}: CategoryProps) => {

    return (
        <div className="album py-2">
            <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {categoryItems.length
                    ? categoryItems.map((item) => {
                        return <DeviceItem key={item.id} device={item}/>
                    })
                    : <EmptyDeviceList/>
                }

            </Row>
        </div>
    );
};

export default DeviceList;