import {makeAutoObservable} from "mobx";

export interface BrandI {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface PaginatorI {
    page: number,
    limit: number,
    totalCount: number,
}

export interface CategoryI {
    id: number,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface FilterI {
    type: 'price' | `rating` | 'id'
    direction: `asc` | `desc`
}

export type DeviceInfoT = Record<string, string | number | Date>

export interface DeviceI {
    id: number,
    name: string,
    description?: string,
    price: number,
    img: string,
    brand?: BrandI,
    category?: CategoryI,
    categoryId?: number,
    brandId?: number,
    rating?: number,
    createdAt?: string,
    updatedAt?: string,
    info: DeviceInfoT[]
}

export default class DeviceStore {
    constructor(
        private _categories: CategoryI[] = [],
        private _brands: BrandI[] = [],
        private _devices: DeviceI[] = [],
        private _selectedCategory: Partial<CategoryI> = {},
        private _selectedBrand: Partial<BrandI> = {},
        private _category: Partial<CategoryI> = {},
        private _selectedFilter: Partial<FilterI> = {},
        private _selectedPage: PaginatorI['page'] = 1,
        private _page: PaginatorI['page'] = 1,
        private _limit: PaginatorI['limit'] = 9,
        private _totalCount: PaginatorI['totalCount'] = 0,

    ) {
        makeAutoObservable(this)
    }

    setSelectedCategory(category: CategoryI) {
        this._selectedCategory = category
        this.setPage(1)
    }

    setSelectedBrand(brand: BrandI) {
        this._selectedBrand = brand
        this.setPage(1)
    }

    setSelectedFilter(filter: FilterI) {
        this._selectedFilter = filter
    }

    setPage(page: PaginatorI['page']) {
        this._page = page
    }

    setTotalCount(totalCount: PaginatorI['totalCount']) {
        this._totalCount = totalCount
    }

    setLimit(limit: PaginatorI['limit']) {
        this._limit = limit
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

    get page(): PaginatorI['page'] {
        return this._page
    }

    get totalCount(): PaginatorI['totalCount'] {
        return this._totalCount
    }

    get limit(): PaginatorI['limit'] {
        return this._limit
    }

    get selectedCategory(): Partial<CategoryI> {
        return this._selectedCategory
    }

    get selectedPage(): Partial<PaginatorI['page']> {
        return this._selectedPage
    }

    get selectedBrand(): Partial<BrandI> {
        return this._selectedBrand
    }

    get selectedFilter(): Partial<FilterI> {
        return this._selectedFilter
    }

    getCategoryById(id:CategoryI['id']){
        for (let category of [...this.categories.flat()]) {
            if (category.id === id) {
                return category
            }
        }
        return false
    }

    getBrandById(id:BrandI['id']){
        for (let brand of [...this.brands.flat()]) {
            if (brand.id === id) {
                return brand
            }
        }
        return false
    }

    clearSelectedCategory(){
        this._selectedCategory = {}
    }
    clearSelectedBrand(){
        this._selectedBrand = {}
    }
}