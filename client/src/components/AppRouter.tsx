import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {authorizedRoutes, unauthorizedRoutes} from "../routes";
import {RouteI} from "../utils/Routes";
import {Context} from '../index'

const AppRouter = () => {
    const {user} = useContext(Context)

    
    return (
        <Routes>
            {user.isAuth ?
                authorizedRoutes.map(({path, View }) =>
                <Route key={path} path={path} element={<View />} />
            )
            :   unauthorizedRoutes.map(({path, View}) =>
                <Route key={path} path={path} element={<View />} />
            )}
            {/*
            <Route path='*' element={<Navigate to={'/' as RouteI["path"]} />} />
             */}
        </Routes>
    );
};

export default AppRouter;