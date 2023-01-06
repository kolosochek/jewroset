import {$authHost, $host} from "./index";
import {BrandI, CategoryI, DeviceI, FilterI, PaginatorI} from "../store/DeviceStore";

export const createCategory = async (category: Partial<CategoryI>) => {
    const {data} = await $authHost.post(`api/category`, category)
    return data
}
export const fetchCategories = async () => {
    const {data} = await $host.get(`api/category`)
    return data
}

export const createBrand = async (brand: Partial<BrandI>) => {
    const {data} = await $authHost.post(`api/brand`, brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get(`api/brand`)
    return data
}

export const createDevice = async (device: Partial<DeviceI>) => {
    const {data} = await $authHost.post(`api/device`, device)
    return data
}

export const fetchDevices = async (categoryId?: CategoryI['id'], brandId?: BrandI['id'], filterByType?: FilterI['type'], filterByDirection?: FilterI['direction'], page?: PaginatorI['page'], limit: number = 9) => {
    const {data} = await $host.get('api/device', {
        params: {
            categoryId, brandId, filterByType, filterByDirection, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id: number) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}