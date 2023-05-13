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
import {clearBasket, findOrCreateBasket} from "../http/basketAPI";
import {UserI} from "../store/UserStore";
import {v4 as uuidv4} from "uuid";
import {setUserCookie} from "../http/userAPI";
import {createGuestUser} from "../App";
import {useCookies} from "react-cookie";


export const eraseCookie = (name:string) => {
    document.cookie = name+'=; Max-Age=-99999999;';
}

const Navbar = observer(() => {
    const {user, basket, device} = useContext(Context)
    const [cookies, setCookie] = useCookies(["userEmail"]);
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
            const guest: Partial<UserI> = {email: `${uuidv4()}@guest.com`, role: 'GUEST', password:"z!asasd@3f1"}
            createGuestUser(guest).then(userParam => {
                const guestUser:UserI = userParam as unknown as UserI
                // set user cookie
                setUserCookie(guest.email!, setCookie)
                user.setUser(guestUser)
                findOrCreateBasket(guestUser.id).then(basketParam => {
                    basket.setBasket(basketParam)
                })
            })
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
                <NavLink onClick={() => {
                    device.setSelectedCategory({id: 0, name: `All`})
                    device.setSelectedBrand({id: 0, name: `All`})
                }} to={'/' as RouteI['path']}>Jewroset</NavLink>
                <Nav className="ml-auto">
                    {user.isAuth ?
                        <>
                            {user.isAdmin && <Button className="btn"
                                                                   onClick={() => navigate('/admin' as RouteI['path'])}>Admin</Button>}
                            <Button className="ms-2 btn" onClick={() => navigate('/personal' as RouteI['path'])}>Orders</Button>
                            <Button className="ms-2 btn" onClick={() => logout()}>Logout</Button>

                        </>
                        :
                        <>
                            <Button className="btn btn-primary "
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