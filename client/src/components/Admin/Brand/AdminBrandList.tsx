import React, {useContext, useEffect, useState} from 'react';
import {Spinner, Button} from "react-bootstrap";
import BrandModal from "../../Modals/BrandModal";
import {AdminBrandContext} from "../../../views/Admin/AdminBrands";
import {getAllBrands} from "../../../http/deviceAPI";
import {BrandI} from "../../../store/DeviceStore";
import AdminBrandListActions from "./AdminBrandListActions";
import AdminBrandListHeader from "./AdminBrandListHeader";
import AdminBrandItem from "./AdminBrandItem";


const AdminBrandList: React.FC = () => {
    const {isForceRender} = useContext(AdminBrandContext)
    const [brands, setBrands] = useState<BrandI[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllBrands().then(brandsParam => {
            setBrands(brandsParam)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isForceRender])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }


    return (
        <>
            <section className="col-10">
                <div className="wrapper d-flex flex-column">
                    <AdminBrandListActions/>
                    <section className="mt-3 mb-3">
                        {brands
                            ? (<>
                                <AdminBrandListHeader/>
                                {brands.map((brand: BrandI, index) => {
                                    return (
                                        <AdminBrandItem key={brand.id} brand={brand} index={index}/>
                                    )
                                })}
                            </>)
                            : (<h3>No items in this section</h3>)
                        }
                    </section>
                </div>
            </section>
        </>
    )
}

export default AdminBrandList;