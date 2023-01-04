import {makeAutoObservable} from "mobx";
import {v4 as uuidv4} from "uuid";

export interface UserI {
    id: number,
    email: string,
    password?: string,
    role?: "USER" | "ADMIN" | "GUEST",
    createdAt?: string,
    updatedAt?: string,
}

export default class UserStore {
    constructor(
        private _isAuth: boolean = false,
        // create new guest user
        private _user: Partial<UserI> = {email: `${uuidv4()}@guest.com`, role: 'GUEST', password:"123123123"}) {
        //const token = generateJwt(req.user.id, req.user.email, req.user.role)

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