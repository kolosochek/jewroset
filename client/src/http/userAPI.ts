import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {UserI} from "../store/UserStore";


export const setUserCookie = (email: UserI['email'], setCookieFunction:Function) => {
    setCookieFunction("userEmail", email, {
        path: "/",
        maxAge: 24 * 60 * 60 * 183 // 6 month,
    })
}
export const userSignUp = async (user: Partial<UserI> = {}) => {
    const {email, password, role} = user
    const {data} = await $host.post(`api/user/signup`, {email, password, role: role ?? 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const findUser = async (email:UserI['email']) => {
    const {data} = await $host.post(`api/user/find`, {email})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const findUserData = async (email:UserI['email']) => {
    const {data} = await $host.post(`api/user/find/raw`, {email})
    return data
}

export const updateUser = async (userObj:Partial<UserI>) => {
    const {data} = await $host.post(`api/user/update`, {userObj})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const userSignIn = async (user: Partial<UserI> = {}) => {
    const {email, password} = user
    const {data} = await $host.post(`api/user/signin`, {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const guestFindOrCreate = async (user: Partial<UserI> = {}) => {
    const {email, password, role} = user
    const {data} = await $host.post(`api/user/guest`, {email, password, role})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const userCheck = async () => {
    const {data} = await $authHost.post(`api/user/auth`)
    if (data) {
        localStorage.setItem('token', data.token)
        const decodedToken = jwtDecode(data.token)
        return decodedToken
    } else {
        throw new Error('No token recieved!')
    }
}