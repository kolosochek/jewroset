import React, {useContext, useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {AdminCategoryContext} from "../../../views/Admin/AdminCategories";
import AdminCategoryListActions from "./AdminCategoryListActions";
import AdminCategoryListHeader from "./AdminCategoryListHeader";
import AdminCategoryItem from "./AdminCategoryItem";
import {getAllCategories} from "../../../http/categoryAPI";
import {CategoryI} from "../../../store/DeviceStore";
import {Loader} from "../../Loader/Loader";


const AdminCategoryList: React.FC = () => {
    const {isForceRender} = useContext(AdminCategoryContext)
    const [categories, setCategories] = useState<CategoryI[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllCategories().then(categoriesParam => {
            setCategories(categoriesParam)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isForceRender])

    if (isLoading) {
        return <Loader />
    }


    return (
        <>
            <section className="col-10">
                <div className="wrapper d-flex flex-column">
                    <AdminCategoryListActions/>
                    <section className="mt-3 mb-3">
                        {categories
                            ? (<>
                                <AdminCategoryListHeader />
                                {categories.map((category: CategoryI, index) => {
                                    return (
                                        <AdminCategoryItem key={category.id} category={category} index={index}/>
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

export default AdminCategoryList;