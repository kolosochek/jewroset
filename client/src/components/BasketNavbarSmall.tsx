import React, {PropsWithChildren, useContext, useEffect} from 'react';
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {findOrCreateBasket} from "../http/basketAPI"
import {BasketI} from "../store/BasketStore";

interface BasketNavbarSmallProps extends PropsWithChildren{
    count?: BasketI['count'];
}

const BasketNavbarSmall:React.FC<BasketNavbarSmallProps> = (basket) => {
    const navigate = useNavigate()


    return (
        <Button className="bg-primary btn btn-primary ms-2"
                onClick={() => navigate('/basket' as RouteI['path'])}>{`Basket items: ${basket.count ?? 0}`}</Button>
    )
}

export default BasketNavbarSmall;