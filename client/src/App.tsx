import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter";
import NavbarComponent from "./components/NavbarComponent";
import {Container, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {userCheck} from "./http/userAPI";
import {UserI} from "./store/UserStore";


const App = observer(() => {
    const {user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);


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
