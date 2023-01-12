import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import {CookiesProvider} from "react-cookie"
import OrderStore from "./store/OrderStore";

export const Context = createContext({
    user: new UserStore(),
    basket: new BasketStore(),
    device: new DeviceStore(),
    order: new OrderStore(),
})


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Context.Provider value={{
                user: new UserStore(),
                basket: new BasketStore(),
                device: new DeviceStore(),
                order: new OrderStore(),
            }}>
                <App/>
            </Context.Provider>
        </CookiesProvider>
    </React.StrictMode>
);
