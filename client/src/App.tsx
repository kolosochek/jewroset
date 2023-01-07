import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter";
import NavbarComponent from "./components/NavbarComponent";
import {Container, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {findUser, userCheck, userSignUp} from "./http/userAPI";
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
const findOrCreateGuestBasket = async (userId:UserI['id']) => {
    const basket = await findOrCreateBasket(userId)
    return basket
}


const App = observer(() => {
    const {user} = useContext(Context);
    const {basket} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    basket.setBasket(user.userBasket)
    const [cookies, setCookie] = useCookies(["userEmail"]);


    const setUserCookie = (userEmail:UserI['email'] = user.user.email!) => {
        setCookie("userEmail", userEmail, {
            path: "/"
        });
    }
    // get user from cookies or create it
    const userEmailCookie = cookies.userEmail
    console.log(`cookies.userEmail`)
    console.log(cookies.userEmail)
    if (userEmailCookie) {
        const findUser = findUserByEmail(userEmailCookie).then((foundUser) => {

            // debug
            console.log(`foundUser`)
            console.log(foundUser)
            //
            // user.setUser()
        })
    } else {
        // create new guest user
        const guest: Partial<UserI> = {email: `${uuidv4()}@guest.com`, role: 'GUEST', password:"123123123"}
        const createGuest = createGuestUser(guest).then(userParam => {
            const guestUser:UserI = userParam as unknown as UserI
            user.setUser(guestUser)
            const createBasket = findOrCreateGuestBasket(guestUser.id!).then(basket => {
                user.setUserBasket(basket)
            })
            // set user cookie
            setUserCookie(user.user.email)
        })
    }



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
