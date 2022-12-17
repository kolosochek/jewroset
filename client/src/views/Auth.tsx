import React from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {RouteI} from "../utils/Routes";

const Auth = () => {
    const location = useLocation();
    let isLoginView: undefined | boolean = undefined;
    switch (location.pathname as RouteI['path']) {
        case ('/signin'): {
            isLoginView = true;
            break;
        }
        case ('/signup'): {
            break;
        }
        default: {
            break;
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
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <Form.Control
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    required
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
                            />
                        </div>
                    </>
                    }
                    <div className="text-center mt-3">
                        <Button type="submit" className="me-2 btn btn-primary">{isLoginView ? 'Log In' : 'Sign Up'}</Button>
                        <NavLink to={isLoginView ? "/signup" : "/signin"} className="btn-lg-. btn-primary">{isLoginView ? 'Sign Up' : 'Log In'}</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    )
};

export default Auth;