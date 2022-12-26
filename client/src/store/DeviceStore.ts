import {makeAutoObservable} from "mobx";

export interface BrandI {
    id?: number,
    name?: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface CategoryI {
    id?: number,
    name?: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface DeviceI {
    id: number,
    name: string,
    price: number,
    rating?: number,
    img: string,
    category: CategoryI | CategoryI[],
    brand: BrandI,
    createdAt?: string,
    updatedAt?: string,
}

export default class DeviceStore {
    constructor(
        private _categories: CategoryI[] = [
            {id: 1, name: "Laptops"},
            {id: 2, name: "Smartphones"},
            {id: 3, name: "Printers"},
        ],
        private _brands: BrandI[] = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Xiaomi"},
            {id: 4, name: "Huawei"},
            {id: 5, name: "Apple"},
            {id: 6, name: "Xiaomi"},
            {id: 7, name: "Huawei"},
            {id: 8, name: "Apple"},
            {id: 9, name: "Xiaomi"},
            {id: 10, name: "Huawei"},
            {id: 11, name: "Apple"},
            {id: 12, name: "Xiaomi"},
            {id: 13, name: "Huawei"},
            {id: 14, name: "Apple"},
            {id: 15, name: "Xiaomi"},
            {id: 16, name: "Huawei"},
        ],
        private _devices: DeviceI[] = [
            {
                id: 1,
                name: "Apple Iphone 13 Pro Max",
                price: 1190,
                rating: 0,
                img: "ca6c8b50-97a4-415d-8ba4-5d4b4101a5f5.jpg",
                category: {id: 2, name: "Smartphones"},
                brand: {
                    id: 2, name: "Apple"
                }
            },
            {
                id: 2,
                name: "Xiaomi Redmi Note 12",
                price: 990,
                rating: 4,
                img: "c7b11ef88-e8d4-467f-bdb1-8460fbb5c23c.jpg",
                category: { id: 2, name: "Smartphones"},
                brand: { id: 3, name: "Xiaomi" }
            },
            {
                id: 3,
                name: "Huawei MateBook D15 i5 1135G7",
                price: 490,
                rating: 3,
                img: "ac473e8b-fba8-4386-a336-79f885061c9e.jpg",
                category: {
                    id: 1, name: "Laptops"
                },
                brand: {
                    id: 3, name: "Huawei"
                }
            },
            {
                id: 4,
                name: "Apple MacBook Air Space Gray M2",
                price: 1790,
                rating: 5,
                img: "8d6b66d8-a0c6-4587-83c6-aa5f6a6dad63.jpg",
                category: {
                    id: 1, name: "Laptops"
                },
                brand: {
                    id: 2, name: "Apple"
                }
            },
        ],
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

    get brands() {
        return this._brands
    }

    get devices(): DeviceI[] {
        return this._devices
    }

    get selectedCategory(): CategoryI {
        return this._selectedCategory
    }

    get selectedBrand(): BrandI {
        return this._selectedBrand
    }
}