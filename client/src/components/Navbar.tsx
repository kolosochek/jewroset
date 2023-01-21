import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as NavbarBootstrap} from 'react-bootstrap';
import {NavLink, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import BasketNavbarSmall from "./BasketNavbarSmall";
import {clearBasket} from "../http/basketAPI";


export const eraseCookie = (name:string) => {
    document.cookie = name+'=; Max-Age=-99999999;';
}

const Navbar = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const navigate = useNavigate()


    const logout = () => {
        if (basket.basket.id) {
            clearBasket(user.id!, basket.id!).then(() => {
                user.setUser({})
                user.setIsAuth(false)
                if (user.user.role === "ADMIN") {
                    user.setIsAdmin(false)
                }
                localStorage.removeItem('token')
                // remove cookie
                eraseCookie('userEmail')
                basket.setBasket({})
                navigate('/' as RouteI['path'])
            })
        } else {
            user.setUser({})
            user.setIsAuth(false)
            if (user.user.role === "ADMIN") {
                user.setIsAdmin(false)
            }
            localStorage.removeItem('token')
            // remove cookie
            eraseCookie('userEmail')
            basket.setBasket({})
        }


    }

    return (
        <NavbarBootstrap bg="" variant="light">
            <Container>
                <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                <Nav className="ml-auto">
                    {user.isAuth ?
                        <>
                            {user.isAdmin && <Button className="bg-primary btn"
                                                                   onClick={() => navigate('/admin' as RouteI['path'])}>Admin</Button>}
                            <Button className="ms-2 bg-primary btn" onClick={() => navigate('/personal' as RouteI['path'])}>Orders</Button>
                            <Button className="ms-2 bg-primary btn" onClick={() => logout()}>Logout</Button>

                        </>
                        :
                        <>
                            <Button className="bg-primary btn btn-primary "
                                    onClick={() => navigate('/signin' as RouteI['path'])}>Login</Button>
                        </>

                    }
                    <BasketNavbarSmall count={basket.itemsTotal}/>
                </Nav>
            </Container>
        </NavbarBootstrap>
    );
});

export default Navbar;