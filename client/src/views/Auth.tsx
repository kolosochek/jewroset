import React, {useContext, useRef, useState} from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {setUserCookie, userSignIn, userSignUp} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useCookies} from "react-cookie";

const Auth = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [formSubmitError, setFormSubmitError] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(["userEmail"]);
    const form = useRef<HTMLFormElement | null>(null);

    let isLoginView: boolean = false;
    if (location.pathname as RouteI['path'] === '/signin' as RouteI['path']) {
        isLoginView = true;
    }

    const authManage = async () => {
        if (form && form.current) {
            // validate form
            if (form.current.checkValidity()) {
                let responseUser;
                // login view
                if (isLoginView) {
                    responseUser = await userSignIn({email, password}).then(response => {
                        if (response.error) {
                            setFormSubmitError(response.error)
                        } else {
                            user.setUser(response)
                            user.setIsAuth(true)
                            if (user.user.role === "ADMIN") {
                                user.setIsAdmin(true)
                            }
                            setUserCookie(user.user.email!, setCookie)
                            navigate('/' as RouteI['path'])
                        }
                    }).catch(() => {
                        setFormSubmitError(`Email or password is incorrect`)
                    })
                    // signup view
                } else {
                    const userObj = {
                        email,
                        password
                    }
                    responseUser = await userSignUp(userObj).then(response => {
                        if (response.error) {
                            setFormSubmitError(response.error)
                        } else {
                            user.setUser(response)
                            user.setIsAuth(true)
                            if (user.user.role === "ADMIN") {
                                user.setIsAdmin(true)
                            }
                            setUserCookie(user.user.email!, setCookie)
                            navigate('/' as RouteI['path'])
                        }
                    })
                }
            }

            form.current.classList.add('was-validated')
        }
    }

    return (
        <Container>
            <Card className="border-0 pt-3 pb-3 flex-column justify-content-center">
                <div className="text-center">
                    <h2 className="">{isLoginView ? 'Login' : 'Register'}</h2>
                </div>
                <Form className="needs-validation mt-5" noValidate={true} ref={form}>
                    {isLoginView &&
                        <>
                            <div className="mb-3">
                                <Form.Label htmlFor="email" className="form-label">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="some@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid email.
                                </div>
                            </div>
                            <div className="mb-3">
                                <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="*****"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid password.
                                </div>
                            </div>
                        </>
                    }
                    {!isLoginView &&
                        <>
                            <div className="mb-3">
                                <Form.Label htmlFor="email" className="form-label">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="some@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid email.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="*****"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid password.
                                </div>
                            </div>
                        </>
                    }
                    <div className="mb-2" style={{minHeight: '2em'}}>
                        {formSubmitError && (<p className="text-danger">{formSubmitError}</p>)}
                    </div>
                    <div className="text-center mt-5">
                        <Button
                            onClick={authManage}
                            className="me-3 btn btn-primary"
                        >{isLoginView ? 'Log In' : 'Sign Up'}</Button>
                        <NavLink
                            to={isLoginView ? "/signup" : "/signin"}
                            className="btn-lg-. btn-primary"
                            onClick={() => {
                                // clear previous error messages
                                setFormSubmitError('')
                            }}
                        >{isLoginView ? 'Sign Up' : 'Log In'}</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;