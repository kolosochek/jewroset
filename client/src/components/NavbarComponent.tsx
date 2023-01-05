import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import BasketNavbarSmall from "./BasketNavbarSmall";
import {findOrCreateBasket} from "../http/basketAPI";


const NavbarComponent = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        //findOrCreateBasket(user.user.email!).then(data => basket.setBasket(data))
    }, [])


    const _logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate('/' as RouteI['path'])
    }

    return (
        <Navbar bg="" variant="light">
            <Container>
                <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                <Nav className="ml-auto">
                    {user.isAuth ?
                        <>
                            {user.user.role === 'ADMIN' && <Button className="bg-primary btn"
                                                                   onClick={() => navigate('/admin' as RouteI['path'])}>Admin</Button>}
                            <Button className="ms-2 bg-primary btn" onClick={() => _logout()}>Logout</Button>

                        </>
                        :
                        <>
                            <Button className="bg-primary btn btn-primary "
                                    onClick={() => navigate('/signin' as RouteI['path'])}>Login</Button>
                        </>

                    }
                    <BasketNavbarSmall count={basket.basket.basket_devices?.length}/>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavbarComponent;