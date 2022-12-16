import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {authorizedRoutes, unauthorizedRoutes} from "../routes";
import {RouteI} from "../utils/Routes";

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && authorizedRoutes.map(({path, View }) =>
                <Route key={path} path={path} element={<View />} />
            )}
            {unauthorizedRoutes.map(({path, View}) =>
                <Route key={path} path={path} element={<View />} />
            )}
        </Routes>
    );
};

export default AppRouter;