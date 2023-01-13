import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";

const Payment = () => {
    const {order} = useContext(Context)
    const navigate = useNavigate()


    return (
        <div>
            <h1>{`Thank you! Your order with id: ${order.order.id} has been payed! We will contact you and ship your order ASAP!`}</h1>
            <a onClick={() => navigate('/' as RouteI['path'])}>Main page</a>
        </div>
    )
}

export default Payment;