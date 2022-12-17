import {makeAutoObservable} from "mobx";

export type CategoryT = Record<string, string|number>[]
export type BrandT = Record<string, string|number>[]
export type DeviceT = Record<string, string|number>[]
export default class DeviceStore {
    constructor(
        private _categories:CategoryT = [
            {id: 1, name: "Laptops"},
            {id: 2, name: "Smartphones"},
            {id: 3, name: "Printers"},
        ],
        private _brands:BrandT = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Xiaomi"},
            {id: 4, name: "Huawei"},
        ],
        private _devices:DeviceT = [
            {id: 1, name: "Apple Iphone 13 Pro Max", price: 1190, rating: 0, img: "ca6c8b50-97a4-415d-8ba4-5d4b4101a5f5.jpg", categoryId: 2, brandId:2},
            {id: 1, name: "Xiaomi Redmi Note 12", price: 990, rating: 0, img: "7b11ef88-e8d4-467f-bdb1-8460fbb5c23c.jpg", categoryId: 2, brandId:3},
            {id: 1, name: "Huawei MateBook D15 i5 1135G7", price: 490, rating: 0, img: "ac473e8b-fba8-4386-a336-79f885061c9e.jpg", categoryId: 1, brandId:4},
            {id: 1, name: "Apple MacBook Air Space Gray M2", price: 1790, rating: 0, img: "8d6b66d8-a0c6-4587-83c6-aa5f6a6dad63.jpg", categoryId: 1, brandId:2},
            ],)
        {
            makeAutoObservable(this)
        }

        setCategories(categories:CategoryT) {
            this._categories = categories
        }
        setBrands(brands:BrandT) {
            this._brands = brands
        }
        setDevices(devices:DeviceT) {
            this._devices = devices
        }

        get categories() {
            return this._categories
        }

        get brands() {
            return this._brands
        }

        get devices() {
            return this._devices
        }
}