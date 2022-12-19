import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const userSignUp = async (email?:string, password?: string) => {
    const {data} = await $host.post(`api/user/signup`, {email, password, role: `ADMIN`})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const userSignIn = async (email?:string, password?: string) => {
    const {data} = await $host.post(`api/user/signin`, {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const userCheck = async (email?:string, password?: string) => {
    const {data} = await $authHost.post(`api/user/auth`, {email, password, role: `ADMIN`})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}