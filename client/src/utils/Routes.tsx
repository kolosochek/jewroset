import Admin from "../views/Admin";
import Auth from "../views/Auth";
import Basket from "../views/Basket";
import Catalog from "../views/Catalog";
import Device from "../views/Device";
import Index from "../views/Index";
import * as React from "react";

export type RoutePathT = "/"
    | "/admin"
    | "/basket"
    | "/signin"
    | "/signup"
    | "/catalog"
    | "/device"
    | "/checkout"
    | "payment"
    | string;
export type ViewT = typeof Admin | typeof Auth | typeof Basket | typeof Device | typeof Index | typeof Catalog

export interface RouteI {
    path: RoutePathT,
    View: ViewT
}