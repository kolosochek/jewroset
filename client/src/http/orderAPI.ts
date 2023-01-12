import {$host} from "./index";
import {UserI} from "../store/UserStore";
import {BasketI} from "../store/BasketStore";
import jwtDecode from "jwt-decode";
import {OrderI} from "../store/OrderStore";


export const createOrder = async (orderObj:Partial<OrderI>) => {
    const {data} = await $host.post('api/order', {orderObj})
    return data
}