import {RouteI} from "./utils/Routes";
import Admin from "./views/Admin";
import Basket from "./views/Basket";
import Item from "./views/Item";
import Catalog from "./views/Catalog";
import Auth from "./views/Auth";


export const authorizedRoutes: RouteI[] = [
    {
        path: '/admin',
        View: Admin,
    },
    {
        path: '/basket',
        View: Basket,
    }
]

export const unauthorizedRoutes: RouteI[] = [
    {
        path: '/catalog',
        View: Catalog,
    },
    {
        path: '/signin',
        View: Auth,
    },
    {
        path: '/signup',
        View: Auth,
    },
    {
        path: '/device',
        View: Item,
    },
    {
        path: '/device/:id',
        View: Item,
    }
]