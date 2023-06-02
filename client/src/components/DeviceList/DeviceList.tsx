import React from 'react';
import {Row} from "react-bootstrap";
import DeviceItem from "../DeviceItem/DeviceItem";
import {DeviceI} from "../../store/DeviceStore";
import EmptyDeviceList from "../EmptyDeviceList";


interface CategoryProps {
    categoryItems: DeviceI[]
}

const DeviceList = ({categoryItems}: CategoryProps) => {

    return (
        <div className="album py-2">
            <Row
                className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
                style={{
                    perspective: "500px",
                    position: "relative",
                    zIndex: 100,
            }}
            >
                {categoryItems.length
                    ? categoryItems.map((item) => {
                        return <DeviceItem key={item.id} deviceItem={item}/>
                    })
                    : <EmptyDeviceList/>
                }
            </Row>
        </div>
    );
};

export default DeviceList;