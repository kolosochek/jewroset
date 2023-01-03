import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {
    fetchBrands,
    fetchCategories,
    fetchAllDevices,
    fetchDevicesByBrand,
    fetchDevicesByCategory,
    fetchDevicesByCategoryAndBrand, fetchDevices
} from "../http/deviceAPI";
import Sidebar from "../components/Sidebar";
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
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(categoryId, brandId, filterByType, filterByDirection, page).then(data => device.setDevices(data.rows))
        /*
        // no category no brand no filter
        if (!categoryId && !brandId && !filterBy){
            fetchAllDevices().then(data => device.setDevices(data.rows))
        }
        // by category no brand no filter
        if (categoryId && !brandId && !filterBy){
            fetchDevices(categoryId).then(data => device.setDevices(data.rows))
            //fetchDevicesByCategory(+categoryId!).then(data => device.setDevices(data.rows))
        }
        // by brand no category no filter
        if (!categoryId && brandId && !filterBy){
            fetchDevicesByBrand(+brandId!).then(data => device.setDevices(data.rows))
        }
        // by brand by category no filter
        if (categoryId && brandId && !filterBy){
            // debug
            console.log()
            //
            fetchDevicesByCategoryAndBrand(+categoryId, +brandId).then(data => device.setDevices(data.rows))
        }
        */
    }, [categoryId, brandId, filterByType])

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Sidebar/>
            </aside>
            <section className="col-9 flex py-3">
                <Brandbar/>
                <DeviceList categoryItems={device.devices}/>
            </section>
        </section>
    )
})

export default Catalog;