import {RouteI} from "./utils/Routes";
import AdminDashboard from "./views/Admin/AdminDashboard";
import Auth from "./views/Auth";
import Basket from "./views/Basket";
import Index from "./views/Index";
import Catalog from "./views/Catalog";
import Device from "./views/Device";
import Checkout from "./views/Checkout";
import Payment from "./views/Payment";
import Personal from "./views/Personal";
import AdminProducts from "./views/Admin/AdminProducts";
import AdminOrders from "./views/Admin/AdminOrders";
import AdminClients from "./views/Admin/AdminClients";

export const defaultRoute: RouteI = {path: '/', View: Index}
const adminRoutes: RouteI[] = [
    {
        path: '/admin', View: AdminDashboard,
    },
    {
        path: '/Admin/products', View: AdminProducts,
    },
    {
        path: '/Admin/orders', View: AdminOrders,
    },
    {
        path: '/Admin/clients', View: AdminClients,
    },
]
const commonRoutes: RouteI[] = [
    {
        path: '/checkout', View: Checkout,
    },
    {
        path: '/basket', View: Basket,
    },
    {
        path: '/payment', View: Payment,
    },
]

export const authorizedRoutes: RouteI[] = [
    defaultRoute,
    ...commonRoutes,
    ...adminRoutes,
    {
        path: '/personal', View: Personal,
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