import {makeAutoObservable} from "mobx";
import {v4 as uuidv4} from "uuid";
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

// create new guest user
const createGuestUser = async (user:Partial<UserI>) => {
    const guest = await userSignUp(user)
    return guest
}
const createGuestBasket = async (userId:UserI['id']) => {
    const basket = await findOrCreateBasket(userId)
    return basket
}
export default class UserStore {
    constructor(
        private _isAuth: boolean = false,
        // create new guest user
        private _user: Partial<UserI> = {},
        private _userBasket: Partial<BasketI> = {}) {
        const guest: Partial<UserI> = {email: `${uuidv4()}@guest.com`, role: 'GUEST', password:"123123123"}
        const createGuest = createGuestUser(guest).then(user => {
            const guestUser = user as unknown as UserI
            this.setUser(guestUser)
            const createBasket = createGuestBasket(guestUser.id!).then(basket => {
                this.setUserBasket(basket)
            })
        })



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