import {RouteI} from "./utils/Routes";
import Admin from "./views/Admin";
import Auth from "./views/Auth";
import Basket from "./views/Basket";
import Index from "./views/Index";
import Catalog from "./views/Catalog";
import Device from "./views/Device";

export const defaultRoute: RouteI = {path: '/', View: Index}

export const authorizedRoutes: RouteI[] = [
    defaultRoute,
    {
        path: '/admin', View: Admin,
    },
    {
        path: '/basket', View: Basket,
    }
]

export const unauthorizedRoutes: RouteI[] = [
    defaultRoute,
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
    {
        path: '/basket', View: Basket,
    }
]