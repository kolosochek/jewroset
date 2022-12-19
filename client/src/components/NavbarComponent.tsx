import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";

import {observer} from "mobx-react-lite";


const NavbarComponent = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const _logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate('/' as RouteI['path'])
    }

    return (
        <Navbar bg="" variant="light">
            <Container>
                {user.isAuth ?
                    <>
                        <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                        <Nav className="ml-auto">
                            <Button className="bg-primary btn" onClick={() => navigate('/admin' as RouteI['path'])}>Admin</Button>
                            <Button className="ms-2 bg-primary btn" onClick={() => _logout()}>Logout</Button>
                        </Nav>
                    </>
                :
                <>
                    <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                    <Nav className="ml-auto">
                        <Button className="bg-primary btn btn-primary " onClick={() => navigate('/signin' as RouteI['path'])}>Login</Button>
                    </Nav>
                </>
            }
            </Container>
        </Navbar>
    );
});

export default NavbarComponent;