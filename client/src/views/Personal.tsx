import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {getUserOrders} from "../http/orderAPI";

const Personal = () => {
    const {user} = useContext(Context)
    const orders = []
    const userOrders = () => {

    }

    useEffect(() => {
        getUserOrders(user.id!).then((userOrders) => {
            orders.push(userOrders)
        }).finally()
    }, [])

    return (
        <div>
            {user.isAuth && (<div>
                <h1>Order</h1>
            </div>)}
        </div>
    )
}

export default Personal;