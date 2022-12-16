import Admin from "../views/Admin";
import Auth from "../views/Auth";
import Basket from "../views/Basket";
import Item from "../views/Item";
import Catalog from "../views/Catalog";

export type RoutePath = "/admin" | "/basket" | "/signin" | "/signup" | "/device" | string;

export interface RouteI {
    path: RoutePath,
    View: typeof Admin | typeof Auth | typeof Basket | typeof Item | typeof Catalog
}