import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {BrandI, CategoryI, DeviceI, FilterI, PaginatorI} from "../store/DeviceStore";

export const createCategory = async (category:Partial<CategoryI>) => {
    const {data} = await $authHost.post(`api/category`, category)
    return data
}
export const fetchCategories = async () => {
    const {data} = await $host.get(`api/category`)
    return data
}

export const createBrand = async (brand:Partial<BrandI>) => {
    const {data} = await $authHost.post(`api/brand`, brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get(`api/brand`)
    return data
}

export const createDevice = async (device:Partial<DeviceI>) => {
    const {data} = await $authHost.post(`api/device`, device)
    return data
}

export const fetchDevices = async (categoryId?:CategoryI['id'], brandId?:BrandI['id'], filterByType?:FilterI['type'], filterByDirection?:FilterI['direction'], page?:PaginatorI['page'], limit:number= 5) => {
    const {data} = await $host.get('api/device', {params: {
            categoryId, brandId, filterByType, filterByDirection, page, limit
        }})
    return data
}
export const fetchAllDevices = async () => {
    const {data} = await $host.get(`api/device`)
    return data
}
export const fetchDevicesByCategory = async (id:CategoryI['id'] = 1) => {
    const {data} = await $host.get(`api/device/category/${id}`)
    return data
}
export const fetchDevicesByBrand = async (id:BrandI['id'] = 1) => {
    const {data} = await $host.get(`api/device/brand/${id}`)
    return data
}

export const fetchDevicesByCategoryAndBrand = async (categoryId:CategoryI['id'] = 1, brandId: BrandI['id'] = 1) => {
    const {data} = await $host.get(`api/device/categorybrand/${categoryId}:${brandId}`)
    return data
}

export const fetchOneDevice = async (id:number) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}