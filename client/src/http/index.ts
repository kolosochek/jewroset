import axios from "axios";

const $host = axios.create({
    baseURL: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
})

const $authHost = axios.create({
    baseURL: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
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