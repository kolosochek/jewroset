import {$authHost, $host} from "./index";
import {CategoryI} from "../store/DeviceStore";


export const getAllCategories = async () => {
    const {data} = await $host.get(`api/category`)
    return data
}
export const adminRemoveCategory = async (categoryId: CategoryI["id"]) => {
    const {data} = await $authHost.post('api/category/remove', {
        params: {
            categoryId
        }
    })
    return data
}

export const adminCreateCategory = async (categoryObj: CategoryI) => {
    const {data} = await $authHost.post(`api/category/create`, {categoryObj})
    return data
}

export const adminUpdateCategory = async (categoryObj: CategoryI) => {
    const {data} = await $authHost.post(`api/brand/update`, {categoryObj})
    return data
}