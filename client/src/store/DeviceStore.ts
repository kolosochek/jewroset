import {makeAutoObservable} from "mobx";

export interface BrandI {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface CategoryI {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}



export type DeviceInfoT = Record<string, string | number | Date>
export interface DeviceI {
    id: number,
    name: string,
    price: number,
    img: string,
    categoryId: number,
    brandId: number,
    rating?: number,
    createdAt?: string,
    updatedAt?: string,
    info: DeviceInfoT[]
}

export default class DeviceStore {
    constructor(
        private _categories: Partial<CategoryI[]> = [],
        private _brands: BrandI[] = [],
        private _devices: DeviceI[] = [],
        private _selectedCategory: Partial<CategoryI> = {},
        private _selectedBrand: Partial<BrandI> = {},
        private _category: Partial<CategoryI> = {},
    ) {
        makeAutoObservable(this)
    }

    setSelectedCategory(category: CategoryI) {
        this._selectedCategory = category
    }

    setSelectedBrand(brand: BrandI) {
        this._selectedBrand = brand
    }

    setCategories(categories: CategoryI[]) {
        this._categories = categories
    }

    setBrands(brands: BrandI[]) {
        this._brands = brands
    }

    setDevices(devices: DeviceI[]) {
        this._devices = devices
    }

    get categories() {
        return this._categories
    }

    get category() {
        return this._category
    }

    get brands(): BrandI[] {
        return this._brands
    }

    get devices(): DeviceI[] {
        return this._devices
    }

    get selectedCategory(): Partial<CategoryI> {
        return this._selectedCategory
    }

    get selectedBrand(): Partial<BrandI> {
        return this._selectedBrand
    }
}