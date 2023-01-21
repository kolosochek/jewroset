import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {
    getAllBrands,
    fetchCategories,
    fetchDevices
} from "../http/deviceAPI";
import Categorybar from "../components/Categorybar";
import Brandbar from "../components/Brandbar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";

const Catalog = observer(() => {
    const {device} = useContext(Context)
    const categoryId = device.selectedCategory.id
    const brandId = device.selectedBrand.id
    const filterByType = device.selectedFilter.type
    const filterByDirection = device.selectedFilter.direction
    const page = device.selectedPage


    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))
        getAllBrands().then(data => device.setBrands(data))
        fetchDevices(categoryId, brandId, filterByType, filterByDirection, page).then(data => device.setDevices(data.rows))
    }, [categoryId, brandId, filterByType])

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Categorybar/>
            </aside>
            <section className="col-9 flex py-3">
                <Brandbar/>
                <DeviceList categoryItems={device.devices}/>
            </section>
        </section>
    )
})

export default Catalog;