import React, {useContext, useEffect} from 'react';
import Sidebar from "../components/Sidebar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import Brandbar from "../components/Brandbar";
import {observer} from "mobx-react-lite";
import {fetchCategories, fetchBrands, fetchDevices} from "../http/deviceAPI";

const Index = observer(() => {
    const {device} = useContext(Context)
    const categoryId = device.selectedCategory.id
    const brandId = device.selectedBrand.id
    const filterByType = device.selectedFilter.type
    const filterByDirection = device.selectedFilter.direction
    const page = device.selectedPage

    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(categoryId, brandId, filterByType, filterByDirection, page).then(data => device.setDevices(data.rows))
    }, [categoryId, brandId, filterByType, filterByDirection, page])

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Sidebar />
            </aside>
            <section className="col-9 flex py-3">
                <Brandbar />
                <DeviceList categoryItems={device.devices} />
            </section>
        </section>
    )
})

export default Index;