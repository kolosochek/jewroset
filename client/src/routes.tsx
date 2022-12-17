import {RouteI} from "./utils/Routes";
import Admin from "./views/Admin";
import Auth from "./views/Auth";
import Basket from "./views/Basket";
import Index from "./views/Index";
import Catalog from "./views/Catalog";
import Item from "./views/Item";


export const authorizedRoutes: RouteI[] = [
    {
        path: '/',
        View: Index,
    },
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
        path: '/',
        View: Index,
    },
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