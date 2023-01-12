import {makeAutoObservable} from "mobx";

export type OrderT = "created" | "awaitingPayment" | "awaitingShipping" | "shipped" | "closed"
export interface OrderI {
    id: number,
    status: OrderT
    userId: number,
    basketId: number,
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