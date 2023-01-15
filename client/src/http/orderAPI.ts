import {$authHost, $host} from "./index";
import {UserI} from "../store/UserStore";
import {OrderI} from "../store/OrderStore";


export const createOrder = async (orderObj: Partial<OrderI>) => {
    const {data} = await $host.post('api/order', {orderObj})
    return data
}

export const getUserOrders = async (userId: UserI['id']) => {
    const {data} = await $host.post('api/order/get', {userId})
    return data
}

export const adminGetAllOrders = async (userId: UserI['id']) => {
    const {data} = await $authHost.get('api/order/all', {
        params: {
            userId
        }
    })
    return data
}

export const adminRemoveOrder = async (userId: UserI['id'], orderId: OrderI["id"]) => {
    const {data} = await $authHost.post('api/order/remove', {
        params: {
            userId, orderId
        }
    })
    return data
}