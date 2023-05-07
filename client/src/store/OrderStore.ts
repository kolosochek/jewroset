import {makeAutoObservable} from "mobx";
import {BasketI} from "./BasketStore";
import {UserI} from "./UserStore";

export const orderStatusArr = ["awaitingPayment", "awaitingShipping", "shipped", "closed"] as const;
export type OrderStatusT = typeof orderStatusArr[number]
export interface OrderI {
    id: number,
    status: OrderStatusT,
    addressone: string,
    addresstwo?: string,
    country: string,
    city: string,
    zip: string
    userId: number,
    basketId: number,
    user?: UserI,
    email?: UserI["email"],
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

    get id() {
        return this._order.id
    }
}