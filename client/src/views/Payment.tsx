import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";

const Payment = () => {
    const {order} = useContext(Context)
    const navigate = useNavigate()


    return (
        <div className="mt-5 text-center">
            <h1 className="">{`Thank you! Your order has been paid!`}</h1>
            <h3>{`We will contact you and ship your order ASAP!`}</h3>
            <section className="d-flex mt-5 b-goto-mainpage-wrapper">
                <div className="container b-checkout">
                    <Button onClick={() => navigate('/' as RouteI['path'])}>Main page</Button>
                </div>
            </section>
        </div>
    )
}

export default Payment;