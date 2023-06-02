import {RouteI} from "./utils/Routes";
import AdminDashboard from "./views/Admin/AdminDashboard";
import Auth from "./views/Auth";
import Basket from "./views/Basket";
import Index from "./views/Index/Index";
import Catalog from "./views/Catalog";
import Device from "./views/Device";
import Checkout from "./views/Checkout";
import Payment from "./views/Payment";
import Orders from "./views/Orders";
import AdminProducts from "./views/Admin/AdminProducts";
import AdminOrders from "./views/Admin/AdminOrders";
import AdminClients from "./views/Admin/AdminClients";
import AdminCategories from "./views/Admin/AdminCategories";
import AdminBrands from "./views/Admin/AdminBrands";

export const defaultRoute: RouteI = {path: '/', View: Index}
const adminRoutes: RouteI[] = [
    {
        path: '/admin', View: AdminDashboard,
    },
    {
        path: '/admin/products', View: AdminProducts,
    },
    {
        path: '/admin/orders', View: AdminOrders,
    },
    {
        path: '/admin/clients', View: AdminClients,
    },
    {
        path: '/admin/categories', View: AdminCategories,
    },
    {
        path: '/admin/brands', View: AdminBrands,
    },
]
const commonRoutes: RouteI[] = [
    {
        path: '/checkout', View: Checkout,
    },
    {
        path: '/basket', View: Basket,
    },
]

export const authorizedRoutes: RouteI[] = [
    defaultRoute,
    ...commonRoutes,
    ...adminRoutes,
    {
        path: '/personal', View: Orders,
    },
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
    {
        path: '/payment', View: Payment,
    },
    {
        path: '/payment/:id', View: Payment,
    },
]