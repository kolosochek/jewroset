import {makeAutoObservable} from "mobx";


export interface BasketI {
    id?: number,
    userId?: number,
    createdAt?: string,
    updatedAt?: string,
}

export default class BasketStore {
    constructor(
        private _basket:BasketI = {}) {
        makeAutoObservable(this)
    }

    setBasket(basket:BasketI) {
        this._basket = basket
    }

    get basket() {
        return this._basket
    }
}