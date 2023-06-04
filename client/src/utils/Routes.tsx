import AdminDashboard from "../views/Admin/AdminDashboard";
import Auth from "../views/Auth";
import Basket from "../views/Basket";
import Catalog from "../views/Catalog";
import Device from "../views/Device";
import Index from "../views/Index/Index";
import * as React from "react";

export type RoutePathT = "/"
    | "/admin"
    | "/basket"
    | "/signin"
    | "/signup"
    | "/catalog"
    | "/device"
    | "/checkout"
    | "/payment"
    | "/orders"
    | string;
export type ViewT = typeof AdminDashboard | typeof Auth | typeof Basket | typeof Device | typeof Index | typeof Catalog

export interface RouteI {
    path: RoutePathT,
    View: ViewT
}