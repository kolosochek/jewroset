import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter";
import NavbarComponent from "./components/NavbarComponent";
import {Container, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {userCheck} from "./http/userAPI";
import {UserI} from "./store/UserStore";
import {useCookies} from "react-cookie";


const App = observer(() => {
    const {user} = useContext(Context);
    const {basket} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    basket.setBasket(user.userBasket)
    const [cookies, setCookie] = useCookies(["user"]);

    const setUserCookie = (userEmail:UserI['email'] = user.user.email!) => {
        setCookie("user", userEmail, {
            path: "/"
        });
    }

    const getUserCookies = () => {
        const [userEmail] = document.cookie.split(';');
        if (!userEmail){
            return ;
        } else {
            return userEmail.replace('userEmail=', '')
        }
    }

    /*
    const userCookie = getUserCookies()
    console.log(`userCookie`)
    console.log(userCookie)
    if (userCookie) {
        // findUserByEmail()
        // user.setUser()
    } else {
        // findOrCreateGuestUser
        // setUserCookie()
    }
     */


    useEffect(() => {
        userCheck().then(data => {
            user.setUser(data as unknown as UserI)
            if (user.user.role !== 'GUEST'){
                user.setIsAuth(true)
            }
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavbarComponent/>
            <Container>
                <AppRouter/>
            </Container>
        </BrowserRouter>
    );
})

export default App;
