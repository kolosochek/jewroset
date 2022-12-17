import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";


const NavbarComponent = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="" variant="light">
            <Container>
                {user.isAuth ?
                    <>
                        <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                        <Nav className="ml-auto">
                            <Button className="bg-primary btn">Admin</Button>
                            <Button className="ms-2 bg-primary btn" onClick={() => user.setIsAuth(false)}>Logout</Button>
                        </Nav>
                    </>
                :
                <>
                    <NavLink to={'/' as RouteI['path']}>Jewroset</NavLink>
                    <Nav className="ml-auto">
                        <NavLink className="bg-primary btn btn-primary " to={'/signin' as RouteI['path']} >Login</NavLink>
                    </Nav>
                </>
            }
            </Container>
        </Navbar>
    );
});

export default NavbarComponent;