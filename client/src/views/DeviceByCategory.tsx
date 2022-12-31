import React, {useContext, useEffect} from 'react';
import Sidebar from "../components/Sidebar";
import DeviceList from "../components/DeviceList";
import DeviceStore from "../store/DeviceStore";
import {Context} from "../index";
import Filterbar from "../components/Filterbar";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchBrands, fetchDevicesByCategory} from "../http/deviceAPI";
import {NavLink, useParams} from "react-router-dom";

const DeviceByCategory = observer(() => {
    const {device} = useContext(Context)
    const {id} = useParams()

    console.log('id')
    console.log(id)


    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevicesByCategory(+id!).then(data => device.setDevices(data.rows))
    }, [])

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Sidebar />
            </aside>
            <section className="col-9 flex py-3">
                <Filterbar />
                <DeviceList categoryItems={device.devices} />
            </section>
        </section>
    )
})

export default DeviceByCategory;