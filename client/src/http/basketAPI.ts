import {$host} from "./index";
import {DeviceI} from "../store/DeviceStore";
import {UserI} from "../store/UserStore";
import {BasketI} from "../store/BasketStore";

export const findOrCreateBasket = async (userId:UserI['id']) => {
    const {data} = await $host.get('api/basket', {
        params: {
            userId
        }
    })
    return data
}

export const incrementBasket = async(basketId: BasketI['id'], deviceId: DeviceI['id'], quantity=1) => {
    const {data} = await $host.post('api/basket/increment', {basketId, deviceId, quantity})
    return data
}

export const decrementBasket = async(basketId: BasketI['id'], deviceId: DeviceI['id'], quantity=1) => {
    const {data} = await $host.post('api/basket/decrement', {basketId, deviceId, quantity})
    return data
}