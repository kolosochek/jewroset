import axios from "axios";
import {getStaticPath} from "../utils";

const $host = axios.create({
    baseURL: getStaticPath()
})

const $authHost = axios.create({
    baseURL: getStaticPath()
})


const authInterceptor = (config: Record<string, any>) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}