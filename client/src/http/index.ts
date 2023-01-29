import axios from "axios";

const $host = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`
})

const $authHost = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`
})

const $paymentHost = axios.create({
    baseURL: `${process.env.REACT_APP_MINATO_URL}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.MINATO_KEY}`
    }
})

const authInterceptor = (config: Record<string, any>) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $paymentHost
}