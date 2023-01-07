import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {UserI} from "../store/UserStore";

export const userSignUp = async (user: Partial<UserI> = {}) => {
    const {email, password, role} = user
    const {data} = await $host.post(`api/user/signup`, {email, password, role: role ?? 'USER'})
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