import {makeAutoObservable} from "mobx";
import {userSignUp} from "../http/userAPI";
import {findOrCreateBasket} from "../http/basketAPI";
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
        private _user: Partial<UserI> = {},
        private _userBasket: Partial<BasketI> = {}) {

        makeAutoObservable(this)
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth
    }

    setUser(user: Partial<UserI>) {
        this._user = user
    }

    setUserBasket(basket: Partial<BasketI>) {
        this._userBasket = basket
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get userBasket() {
        return this._userBasket
    }
}