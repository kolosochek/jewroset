import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(
        private _isAuth:boolean = false,
        private _user:Record<string, string> = {}) {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth:boolean) {
        this._isAuth = isAuth
    }
    setUser(user:Record<string, string>) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}