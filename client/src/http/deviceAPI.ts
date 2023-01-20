import {$authHost, $host} from "./index";
import {BrandI, CategoryI, DeviceI, FilterI, PaginatorI} from "../store/DeviceStore";
import {AdminProductFilterI} from "../views/Admin/AdminProducts";


export const createCategory = async (category: Partial<CategoryI>) => {
    const {data} = await $authHost.post(`api/category`, category)
    return data
}

export const createBrand = async (brand: Partial<BrandI>) => {
    const {data} = await $authHost.post(`api/brand`, brand)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get(`api/category`)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get(`api/brand`)
    return data
}


export const fetchDevices = async (categoryId?: CategoryI['id'], brandId?: BrandI['id'], filterByType?: FilterI['type'], filterByDirection?: FilterI['direction'], page?: PaginatorI['page'], limit: PaginatorI['limit'] = 9) => {
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


export const adminGetDevices = async (categoryId?: CategoryI['id'], brandId?: BrandI['id'], orderBy?: AdminProductFilterI['orderBy'], orderDirection?: AdminProductFilterI['orderDirection'], page?: PaginatorI['page'], limit: PaginatorI['limit'] = 9) => {
    const {data} = await $host.get('api/device/all', {
        params: {
            categoryId, brandId, orderBy, orderDirection, page, limit
        }
    })
    return data
}
export const adminCreateDevice = async (device: FormData) => {
    const {data} = await $authHost.post(`api/device`, device)
    return data
}
export const adminRemoveDevice = async (deviceId: DeviceI["id"]) => {
    const {data} = await $authHost.post('api/device/remove', {
        params: {
            deviceId
        }
    })
    return data
}

export const adminUpdateDevice = async (deviceObj: FormData) => {
    const {data} = await $authHost.post('api/device/update', deviceObj)
    return data
}
