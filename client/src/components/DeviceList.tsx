import React from 'react';
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {DeviceI} from "../store/DeviceStore";


interface CategoryProps {
    categoryItems: DeviceI[]
}

const DeviceList = ({categoryItems}: CategoryProps) => {

    return (
        <div className="album py-3">
            <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {categoryItems && categoryItems.map((item) => {
                    return <DeviceItem key={item.id} device={item}/>
                })}
            </Row>
        </div>
    );
};

export default DeviceList;