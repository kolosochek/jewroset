import axios from "axios";

const $host = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT ? ':'+process.env.REACT_APP_SERVER_PORT : ''}`
})

const $authHost = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_SERVER_PORT ? ':'+process.env.REACT_APP_SERVER_PORT : ''}`
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