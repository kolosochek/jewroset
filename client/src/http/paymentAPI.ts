import {$host} from "./index";


export const adminCreateStripeIntent = async (amount:number, currency:string = 'usd', paymentMethod:string[] = ['card']) => {
    const {data} = await $host.post('api/payment/create', {
        params: {
            amount, currency, paymentMethod
        }
    })
    return data
}