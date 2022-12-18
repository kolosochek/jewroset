import {makeAutoObservable} from "mobx";


export interface UserI {
    id?: number,
    email?: string,
    role?: "USER" | "ADMIN",
    createdAt?: string,
    updatedAt?: string,
}

export default class UserStore {
    constructor(
        private _isAuth:boolean = false,
        private _user:UserI = {}) {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth:boolean) {
        this._isAuth = isAuth
    }
    setUser(user:UserI) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}