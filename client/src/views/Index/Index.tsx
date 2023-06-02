import React, {useContext, useEffect, useState} from 'react';
import Categorybar from "../../components/Categorybar/Categorybar";
import DeviceList from "../../components/DeviceList/DeviceList";
import Brandbar from "../../components/Brandbar";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchDevices} from "../../http/deviceAPI";
import DeviceListPagination from "../../components/DeviceListPagination";
import {Spinner} from "react-bootstrap";
import Filterbar from "../../components/Filterbar";
import {getAllCategories} from "../../http/categoryAPI";
import {getAllBrands} from "../../http/brandAPI";
import {Loader} from "../../components/Loader/Loader";

const Index = observer(() => {
    const {device} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true);
    const categoryId = device.selectedCategory.id
    const brandId = device.selectedBrand.id
    const filterByType = device.selectedFilter.type
    const filterByDirection = device.selectedFilter.direction
    const page = device.page
    const limit = device.limit

    useEffect(() => {
        getAllCategories()
            .then(categoryParam => device.setCategories(categoryParam))
            .catch(error => console.error(`Can't fetch all categorues, reason: ${error.reason || error}`))
        getAllBrands()
            .then(brandsParam => device.setBrands(brandsParam))
            .catch(error => console.error(`Can't get all brands, reason: ${error.reason || error}`))
        fetchDevices(categoryId, brandId, filterByType, filterByDirection, page, limit)
            .then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            // debug
            setIsLoading(false)
        }).catch(error => console.error(`Can't fetch all devices, reason: ${error.reason || error}`))
        //
    }, [categoryId, brandId, filterByType, filterByDirection, page])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Categorybar/>
            </aside>
            <section className="col-9 flex py-3">
                <section className={`b-filter-wrapper container p-0 d-flex flex-wrap`}>
                    <Brandbar/>
                    <Filterbar/>
                </section>
                <DeviceList categoryItems={device.devices}/>
                <DeviceListPagination/>
            </section>
        </section>
    )
})

export default Index;