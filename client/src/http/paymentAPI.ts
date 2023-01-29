import {$paymentHost} from "./index";
import axios from "axios";


export const adminCreateInvoice = async (amount:number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Api-Key 05nelGpe.t9VDnVWhxQRGPA8SHIO3ItG9kc0WfYTv`
        }
    }

    const paymentObj = JSON.stringify({
        amount: amount,
        ttl: 10,
        callback_url: "https://webhook.site/9085d098-90d8-4cfb-b422-9736bf10edb1",
        success_url: "http://localhost:3000/checkout",
        description: "demo description",
        order_id: "1337",
        customer_note: "demo customer note",
        customer_email: "demo_customer_email@email.com"
    })

    const data = axios.post("https://api.minatopay.com/v1/invoices/", paymentObj, config)
    return data
}