import React, {useContext, useEffect, useState} from 'react';
import Categorybar from "../components/Categorybar";
import DeviceList from "../components/DeviceList";
import Brandbar from "../components/Brandbar";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchDevices} from "../http/deviceAPI";
import DeviceListPagination from "../components/DeviceListPagination";
import {Spinner} from "react-bootstrap";
import Filterbar from "../components/Filterbar";
import {getAllCategories} from "../http/categoryAPI";
import {getAllBrands} from "../http/brandAPI";

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
        getAllCategories().then(categoryParam => device.setCategories(categoryParam))
        getAllBrands().then(brandsParam => device.setBrands(brandsParam))
        fetchDevices(categoryId, brandId, filterByType, filterByDirection, page, limit).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(() => setIsLoading(false))
    }, [categoryId, brandId, filterByType, filterByDirection, page])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="content flex-row d-inline-flex container p-0 m-0">
            <aside className="col-3 flex-inline">
                <Categorybar/>
            </aside>
            <section className="col-9 flex py-3">
                <section className="b-filter-wrapper container p-0 d-flex">
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