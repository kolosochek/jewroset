import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {BrandI, CategoryI, DeviceI, FilterI, PaginatorI} from "../store/DeviceStore";
import {UserI} from "../store/UserStore";

export const findOrCreateBasket = async (email: UserI['email']) => {
    const {data} = await $host.get(`api/basket`)
    return data
}