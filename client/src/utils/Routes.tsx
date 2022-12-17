import Admin from "../views/Admin";
import Auth from "../views/Auth";
import Basket from "../views/Basket";
import Catalog from "../views/Catalog";
import Item from "../views/Item";
import Index from "../views/Index";
import * as React from "react";

export type RoutePathT = "/"
    | "/admin"
    | "/basket"
    | "/signin"
    | "/signup"
    | "/catalog"
    | "/device"
    | string;
export type ViewT = typeof Admin | typeof Auth | typeof Basket | typeof Item | typeof Index | typeof Catalog

export interface RouteI {
    path: RoutePathT,
    View: ViewT
}