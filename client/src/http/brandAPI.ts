import {$authHost, $host} from "./index";
import {BrandI} from "../store/DeviceStore";



export const getAllBrands = async () => {
    const {data} = await $host.get(`api/brand`)
    return data
}
export const adminRemoveBrand = async (brandId: BrandI["id"]) => {
    const {data} = await $authHost.post('api/brand/remove', {
        params: {
            brandId
        }
    })
    return data
}

export const adminCreateBrand = async (brandObj: BrandI) => {
    const {data} = await $authHost.post(`api/brand/create`, {brandObj})
    return data
}

export const adminUpdateBrand = async (brandObj: BrandI) => {
    const {data} = await $authHost.post(`api/brand/update`, {brandObj})
    return data
}