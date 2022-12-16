import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {authorizedRoutes} from "../routes";


const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && authorizedRoutes.map(({path, View}) => {
                <Route key={path} path={path} element={<View />} exact/>
            })}
            {authorizedRoutes.map(({path, View}) => {
                <Route key={path} path={path} element={<View />} exact/>
            })}
        </Routes>
    );
};

export default AppRouter;