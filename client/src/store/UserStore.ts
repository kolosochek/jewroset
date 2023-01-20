import {makeAutoObservable} from "mobx";
import {BasketI} from "./BasketStore";


export interface UserI {
    id: number,
    email: string,
    newEmail?: string,
    firstName?: string,
    lastName?: string,
    firstname?: string,
    lastname?: string,
    password?: string,
    phone?: string,
    role?: "USER" | "ADMIN" | "GUEST",
    basket?: Partial<BasketI>,
    userInfo: Record<string, string|number>,
    createdAt?: string,
    updatedAt?: string,
}

export default class UserStore {
    constructor(
        private _isAuth: boolean = false,
        private _isAdmin: boolean = false,
        private _user: Partial<UserI> = {}) {

        makeAutoObservable(this)
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth
    }
    setIsAdmin(isAdmin: boolean) {
        this._isAdmin = isAdmin
    }

    setUser(user: Partial<UserI>) {
        this._user = user
    }

    setUserInfo(userInfo: UserI['userInfo']) {
        this._user.userInfo = userInfo
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }

    get id() {
        return this._user.id
    }

    get userInfo() {
        return this.user.userInfo
    }
}