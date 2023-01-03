import {makeAutoObservable} from "mobx";
import {v4 as uuidv4} from 'uuid';

export interface UserI {
    id: number,
    email: string,
    password?: string,
    role?: "USER" | "ADMIN",
    createdAt?: string,
    updatedAt?: string,
}

export default class UserStore {
    constructor(
        private _isAuth: boolean = false,
        private _user: Partial<UserI> = {email: uuidv4(), role: 'USER'}) {
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