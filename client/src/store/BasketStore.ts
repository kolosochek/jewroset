import {makeAutoObservable} from "mobx";


export interface BasketI {
    id: number,
    count: number,
    userId: number,
    createdAt?: string,
    updatedAt?: string,
}

export default class BasketStore {
    constructor(
        private _basket: Partial<BasketI> = {}) {
        makeAutoObservable(this)
    }

    setBasket(basket: Partial<BasketI>) {
        this._basket = basket
    }

    get basket() {
        return this._basket
    }
}