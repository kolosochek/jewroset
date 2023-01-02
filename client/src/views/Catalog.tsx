import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {
    fetchBrands,
    fetchCategories,
    fetchAllDevices,
    fetchDevicesByBrand,
    fetchDevicesByCategory,
    fetchDevicesByCategoryAndBrand
} from "../http/deviceAPI";
import Sidebar from "../components/Sidebar";
import Brandbar from "../components/Brandbar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";

const Catalog = observer(() => {
    const {device} = useContext(Context)
    const categoryId = device.selectedCategory.id
    const brandId = device.selectedBrand.id


    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))
        fetchBrands().then(data => device.setBrands(data))
        // no category no brand no filter
        if (!categoryId && !brandId){
            fetchAllDevices().then(data => device.setDevices(data.rows))
        }
        // by category
        if (categoryId && !brandId){
            fetchDevicesByCategory(+categoryId!).then(data => device.setDevices(data.rows))
        }
        // by brand
        if (!categoryId && brandId){
            fetchDevicesByBrand(+brandId!).then(data => device.setDevices(data.rows))
        }
        // by brand and by category
        if (categoryId && brandId){
            // debug
            console.log()
            //
            fetchDevicesByCategoryAndBrand(+categoryId, +brandId).then(data => device.setDevices(data.rows))
        }
    }, [categoryId, brandId])

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

export default Catalog;