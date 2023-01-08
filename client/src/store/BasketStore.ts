import {makeAutoObservable} from "mobx";
import {DeviceI} from "./DeviceStore";
import {decrementBasket, incrementBasket, removeFromBasket} from "../http/basketAPI";

export interface BasketDeviceI {
    basketId: BasketI['id'],
    deviceId: DeviceI['id'],
    quantity: number,
    device: Partial<DeviceI>
}
export interface BasketI {
    id: number,
    count: number,
    userId: number,
    basket_devices?: BasketDeviceI[],
    createdAt?: string,
    updatedAt?: string,
}

export default class BasketStore {
    constructor(
        private _basket: Partial<BasketI> = {},
        ) {
        makeAutoObservable(this)
    }

    setBasket(basket: Partial<BasketI>) {
        this._basket = basket
    }

    get basket() {
        return this._basket
    }
    get basketDevices() {
        return this._basket.basket_devices
    }

    getItemById(deviceId: DeviceI['id']) {
        if (this.basket.basket_devices && Array.isArray(this.basket.basket_devices)) {
            for (let device of this.basket.basket_devices) {
                if (+device.deviceId === deviceId) {
                    return device
                }
            }
        }
    }

    getTotalBasketItems():BasketI['count'] {
        let resultQuantity = 0;
        if (this.basket.basket_devices) {
            for (let item of this.basket.basket_devices) {
                resultQuantity += +item.quantity
            }
            return resultQuantity
        } else {
            return resultQuantity
        }
    }


    getDeviceBasketQuantityById(deviceId:DeviceI['id']) {
        const device = this.getItemById(deviceId)
        if (device) {
            return +device!.quantity
        } else {
            return 0
        }
    }

    async incrementBasketDevice(deviceId:DeviceI['id'], quantity = 1){
        const updatedBasket = await incrementBasket(this.basket.id!, deviceId!, quantity)
        this.setBasket(updatedBasket)
        return this.getDeviceBasketQuantityById(deviceId)
    }

    async decrementBasketDevice(deviceId:DeviceI['id'], quantity = 1){
        const updatedBasket = await decrementBasket(this.basket.id!, deviceId!, quantity)
        this.setBasket(updatedBasket)
        return this.getDeviceBasketQuantityById(deviceId)
    }

    async removeBasketDevice(deviceId:DeviceI['id']){
        const updatedBasket = await removeFromBasket(this.basket.id!, deviceId!)
        this.setBasket(updatedBasket)
        return this.getDeviceBasketQuantityById(deviceId)
    }

}