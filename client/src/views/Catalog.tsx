import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchDevices} from "../http/deviceAPI";
import Categorybar from "../components/Categorybar/Categorybar";
import Brandbar from "../components/Brandbar";
import DeviceList from "../components/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/categoryAPI";
import {getAllBrands} from "../http/brandAPI";

const Catalog = observer(() => {
    const {device} = useContext(Context)
    const categoryId = device.selectedCategory.id
    const brandId = device.selectedBrand.id
    const filterByType = device.selectedFilter.type
    const filterByDirection = device.selectedFilter.direction
    const page = device.selectedPage


    useEffect(() => {
        getAllCategories().then(categoryParam => device.setCategories(categoryParam))
        getAllBrands().then(brandParam => device.setBrands(brandParam))
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