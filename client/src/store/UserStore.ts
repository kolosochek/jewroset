import {makeAutoObservable} from "mobx";
import {BasketI} from "./BasketStore";


export interface UserI {
    id: number,
    email: string,
    password?: string,
    role?: "USER" | "ADMIN" | "GUEST",
    basket?: Partial<BasketI>,
    createdAt?: string,
    updatedAt?: string,
}

export default class UserStore {
    constructor(
        private _isAuth: boolean = false,
        private _user: Partial<UserI> = {}) {

        makeAutoObservable(this)
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth
    }

    setUser(user: Partial<UserI>) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}