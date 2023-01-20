import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {DeviceI, PaginatorI} from "../../../store/DeviceStore";
import {fetchDevices} from "../../../http/deviceAPI";
import AdminProductListActions from "./AdminProductListActions";
import AdminProductListHeader from "./AdminProductListHeader";
import AdminProductItem from "./AdminProductItem";
import {AdminProductContext, AdminProductFilterI} from "../../../views/Admin/AdminProducts";


const AdminProductList = () => {
    const {isForceRender} = useContext(AdminProductContext)
    const [devices, setDevices] = useState<DeviceI[]>([])
    // pagination
    const [totalCount, setTotalCount] = useState<PaginatorI['totalCount']>(0);
    const [page, setPage] = useState<PaginatorI['page']>(1)
    const limit = 10
    // filterbar
    const [orderBy, setOrderBy] = useState<AdminProductFilterI['orderBy']>('createdAt')
    const [orderDirection, setOrderDirection] = useState<AdminProductFilterI['orderDirection']>('desc')
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        fetchDevices(undefined, undefined, undefined, undefined, page, limit).then(devicesParam => {
            setTotalCount(devicesParam.count)
            setDevices(devicesParam.rows)
        }).finally(() => setIsLoading(false))
    }, [isForceRender, page, orderBy, orderDirection])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <section className="col-10">
            <div className="wrapper d-flex flex-column">
                <AdminProductListActions />
                <section className="mt-3 mb-3">
                    {devices
                        ? (<>
                            <AdminProductListHeader />
                            {(devices as DeviceI[]).map((device: DeviceI, index) => {
                                return (
                                    <AdminProductItem key={device.id} device={device} index={index} />
                                )
                            })}
                        </>)
                        : (<h3>No items in this section</h3>)
                    }
                </section>
            </div>
        </section>
    )
}

export default AdminProductList;