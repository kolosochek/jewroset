import {$host} from "./index";
import {DeviceI} from "../store/DeviceStore";
import {UserI} from "../store/UserStore";
import {BasketI} from "../store/BasketStore";

export const findOrCreateOrder = async (userId:UserI['id'], basketId:BasketI['id'], formData:FormData) => {
    const {data} = await $host.post('api/order', {
        params: {
            userId, basketId, formData
        }
    })
    return data
}