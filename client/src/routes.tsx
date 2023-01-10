import {RouteI} from "./utils/Routes";
import Admin from "./views/Admin";
import Auth from "./views/Auth";
import Basket from "./views/Basket";
import Index from "./views/Index";
import Catalog from "./views/Catalog";
import Device from "./views/Device";
import Checkout from "./views/Checkout";

export const defaultRoute: RouteI = {path: '/', View: Index}
const commonRoutes: RouteI[] = [
    {
        path: '/basket', View: Basket,
    },
    {
        path: '/checkout', View: Checkout,
    }]

export const authorizedRoutes: RouteI[] = [
    defaultRoute,
    ...commonRoutes,
    {
        path: '/admin', View: Admin,
    }
]

export const unauthorizedRoutes: RouteI[] = [
    defaultRoute,
    ...commonRoutes,
    {
        path: '/catalog', View: Catalog,
    },
    {
        path: '/signin', View: Auth,
    },
    {
        path: '/signup', View: Auth,
    },
    {
        path: '/device', View: Device,
    },
    {
        path: '/device/:id', View: Device,
    },
]