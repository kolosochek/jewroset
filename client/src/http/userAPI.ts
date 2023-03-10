import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {UserI} from "../store/UserStore";
import {PaginatorI} from "../store/DeviceStore";
import {AdminClientFilterI} from "../views/Admin/AdminClients";


export const setUserCookie = (email: UserI['email'], setCookieFunction:Function) => {
    setCookieFunction("userEmail", email, {
        path: "/",
        maxAge: 24 * 60 * 60 * 183 // 6 month,
    })
}

export const userSignIn = async (user: Partial<UserI> = {}) => {
    const {email, password} = user
    const {data} = await $host.post(`api/user/signin`, {email, password})
    if (data.error) {
        return data
    } else {
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}

export const userSignUp = async (user: Partial<UserI> = {}) => {
    const {email, password} = user
    const {data} = await $host.post(`api/user/signup`, {email, password, role: 'USER'})
    if (data.error) {
        return data
    } else {
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }

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

export const adminGetAllUsers = async (page: PaginatorI['page'], limit: PaginatorI['limit'], orderBy:AdminClientFilterI["orderBy"], orderDirection:AdminClientFilterI["orderDirection"]) => {
    const {data} = await $authHost.get('api/user/all', {
        params: {
            page, limit, orderBy, orderDirection
        }
    })
    return data
}

export const adminRemoveUser = async (userId: UserI["id"]) => {
    const {data} = await $authHost.post('api/user/remove', {
        params: {
            userId
        }
    })
    return data
}

export const adminCreateUser = async (userObj:Partial<UserI>) => {
    const {data} = await $authHost.post('api/user/create', {userObj})
    return data
}

export const adminUpdateUser = async (userObj:Partial<UserI>) => {
    const {data} = await $authHost.post(`api/user/update`, {userObj})
    return data
}