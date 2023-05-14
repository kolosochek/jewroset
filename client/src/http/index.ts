import axios from "axios";

const SERVER_URL = `https://jewroset-server.herokuapp.com`

const $host = axios.create({
    baseURL: `${SERVER_URL}`
})

const $authHost = axios.create({
    baseURL: `${SERVER_URL}`
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