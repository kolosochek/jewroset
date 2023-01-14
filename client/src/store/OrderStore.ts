import {makeAutoObservable} from "mobx";
import basket from "../views/Basket";
import {BasketI} from "./BasketStore";

export type OrderT = "awaitingPayment" | "awaitingShipping" | "shipped" | "closed"
export interface OrderI {
    id: number,
    status: OrderT,
    addressone: string,
    addresstwo?: string,
    country: string,
    city: string,
    zip: string
    userId: number,
    basketId: number,

    basket?: BasketI,
    createdAt?: string,
    updatedAt?: string,
}

export default class OrderStore {
    constructor(
        private _order: Partial<OrderI> = {},
    ) {
        makeAutoObservable(this)
    }

    setOrder(order: Partial<OrderI>) {
        this._order = order
    }

    get order() {
        return this._order
    }
}