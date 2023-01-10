import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {userSignIn, userSignUp} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {findOrCreateBasket} from "../http/basketAPI";

const Auth = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const location = useLocation();
    let isLoginView: boolean = false;
    if (location.pathname as RouteI['path'] === '/signin' as RouteI['path']) {
        isLoginView = true;
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async (e: any) => {
        e.preventDefault()
        let responseUser;
        if (isLoginView) {
            responseUser = await userSignIn({email, password})
        } else {
            responseUser = await userSignUp({email, password})
        }
        if (responseUser) {
            user.setUser(responseUser)
            user.setIsAuth(true)
            navigate('/' as RouteI['path'])
        }
    }

    return (
        <Container>
            <Card className="border-0 pt-3 pb-3 flex-column justify-content-center">
                <div className="text-center">
                    <h2 className="">{isLoginView ? 'Login' : 'Register'}</h2>
                </div>
                <Form className="needs-validation" noValidate={true}>
                    {isLoginView &&
                        <>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="some@email.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    }
                    {!isLoginView &&
                        <>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="some@email.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    }
                    <div className="text-center mt-3">
                        <Button
                            onClick={click}
                            type="submit"
                            className="me-2 btn btn-primary"
                        >{isLoginView ? 'Log In' : 'Sign Up'}</Button>
                        <NavLink to={isLoginView ? "/signup" : "/signin"}
                                 className="btn-lg-. btn-primary">{isLoginView ? 'Sign Up' : 'Log In'}</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;