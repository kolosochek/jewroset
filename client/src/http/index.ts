import axios from "axios";
import {SERVER_URL, SERVER_PORT} from "../utils/Const";

const $host = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}/`
})

const $authHost = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}/`
})

const authInterceptor = (config: Record<string, any>) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}