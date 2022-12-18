import React, {useContext} from 'react';
import Sidebar from "../components/Sidebar";
import DeviceList from "../components/DeviceList";
import DeviceStore from "../store/DeviceStore";
import {Context} from "../index";
import Filterbar from "../components/Filterbar";

const Index = () => {
    const {device} = useContext(Context)

    return (
        <section className="content flex-row d-inline-flex">
            <aside className="col-3 flex-inline">
                <Sidebar />
            </aside>
            <section className="col-9 flex py-3">
                <Filterbar />
                <DeviceList categoryItems={device.devices} />
            </section>
        </section>
    )
}

export default Index;