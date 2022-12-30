import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {authorizedRoutes, defaultRoute, unauthorizedRoutes} from "../routes";
import {RouteI} from "../utils/Routes";
import {Context} from '../index';

const AppRouter = () => {
    const {user} = useContext(Context)


    return (
        <Routes>
            {user.isAuth && authorizedRoutes.map(({path, View}) => {
                return (
                    <Route key={path.substr(1, path.length)} path={path as RouteI['path']} element={<View/>}/>
                )
            })}
            {unauthorizedRoutes.map(({path, View}) => {
                return (
                    <Route key={path.substr(1, path.length)} path={path as RouteI['path']} element={<View/>}/>
                )
            })
            }
            <Route path='*' element={<Navigate to={defaultRoute.path}/>}/>
        </Routes>
    )
}

export default AppRouter;