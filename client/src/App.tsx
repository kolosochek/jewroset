import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Container, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {findUser, setUserCookie, userCheck, userSignUp} from "./http/userAPI";
import {UserI} from "./store/UserStore";
import {useCookies} from "react-cookie";
import {v4 as uuidv4} from "uuid";
import {findOrCreateBasket} from "./http/basketAPI";


const findUserByEmail = async (userEmail:UserI['email']) => {
    const foundUser = await findUser(userEmail)
    return foundUser
}

const createGuestUser = async (user:Partial<UserI>) => {
    const guest = await userSignUp(user)
    return guest
}
const findOrCreateUserBasket = async (userId:UserI['id']) => {
    const basket = await findOrCreateBasket(userId)
    return basket
}


const App = observer(() => {
    const {user} = useContext(Context);
    const {basket} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies(["userEmail"]);


    useEffect(() => {
        // get user from cookies or create it
        const userEmailCookie = cookies.userEmail ? cookies.userEmail.replace('%40', '@') : false
        if (userEmailCookie) {
            findUserByEmail(userEmailCookie).then((foundUser) => {
                const userId:UserI['id'] = (foundUser as unknown as Partial<UserI>).id!
                findOrCreateUserBasket(userId).then(basketParam => {
                    basket.setBasket(basketParam)
                })
            })
        } else {
            // create new guest user
            const guest: Partial<UserI> = {email: `${uuidv4()}@guest.com`, role: 'GUEST', password:"123123123"}
            createGuestUser(guest).then(userParam => {
                const guestUser:UserI = userParam as unknown as UserI
                // set user cookie
                setUserCookie(guest.email!, setCookie)
                user.setUser(guestUser)
                findOrCreateUserBasket(guestUser.id).then(basketParam => {
                    basket.setBasket(basketParam)
                })
            })
        }

        userCheck().then(userParam => {
            user.setUser(userParam as unknown as UserI)
            if (user.user.role !== 'GUEST'){
                user.setIsAuth(true)
                if (user.user.role == 'ADMIN'){
                    user.setIsAdmin(true)
                }
            }
        }).finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <Navbar/>
            <Container>
                <AppRouter/>
            </Container>
        </BrowserRouter>
    );
})

export default App;
