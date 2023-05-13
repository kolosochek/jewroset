import React, {useContext, useEffect, useRef} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {UserI} from "../store/UserStore";
import {findUserData, setUserCookie, updateUser} from "../http/userAPI";
import {useCookies} from "react-cookie";
import {OrderI} from "../store/OrderStore";
import {useNavigate} from "react-router-dom";
import SelectCountry from "../components/SelectCountry";
import SelectCity from "../components/SelectCity";
import {Form, Button} from "react-bootstrap";
import {createOrder} from "../http/orderAPI";


const Checkout = observer(() => {
    const {user, basket, order} = useContext(Context)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["userEmail"]);
    const form = useRef<HTMLFormElement | null>(null)

    const createUserOrder = async () => {
        // validation
        if (form && form.current) {
            // if form is valid
            if (form.current.checkValidity()) {
                const userObj: Partial<UserI> = {
                    phone: (form.current.querySelector('input#phone') as HTMLInputElement).value ?? undefined,
                    firstName: (form.current.querySelector('input#firstName') as HTMLInputElement).value ?? undefined,
                    lastName: (form.current.querySelector('input#lastName') as HTMLInputElement).value ?? undefined,
                    role: user.user.role === "ADMIN" ? "ADMIN" : "USER"
                }

                // if user is authorized
                if (user.isAuth) {
                    userObj.email = user.user.email
                    updateUser(userObj).then(() => {
                        //user.setUser(userParam as unknown as UserI)
                        findUserData(user.user.email!).then((userInfo) => {
                            user.setUserInfo(userInfo)
                        })
                    })
                    // if user is guest
                } else {
                    userObj.email = user.user.email
                    userObj.newEmail = (form.current.querySelector('input#email') as HTMLInputElement).value
                    userObj.password = (form.current.querySelector('input#password') as HTMLInputElement).value

                    updateUser(userObj).then(userParam => {
                        user.setUser(userParam as unknown as UserI)
                        user.setIsAuth(true)
                        setUserCookie(user.user.email!, setCookie)
                    })
                }

                // Order
                const orderObj: Partial<OrderI> = {
                    userId: user.id,
                    basketId: basket.id,
                    addressone: (form.current.querySelector('input#addressone') as HTMLInputElement).value ?? undefined,
                    addresstwo: (form.current.querySelector('input#addresstwo') as HTMLInputElement).value ?? undefined,
                    country: (form.current.querySelector('select#country') as HTMLSelectElement).value ?? undefined,
                    city: (form.current.querySelector('select#city') as HTMLSelectElement).value ?? undefined,
                    zip: (form.current.querySelector('input#zip') as HTMLInputElement).value ?? undefined,
                    status: "awaitingPayment"
                }

                // create an order with "awaiting payment" status
                createOrder(orderObj).then((result) => {
                    // get order ID from backend response and save it
                    orderObj.id = result.id;
                    // save current order obj in mobx state manager
                    order.setOrder(orderObj);
                    // goto payment
                    navigate("/payment")
                }).catch(error => console.log(`Can't update order, error: ${error.reason || error}`))

            }

            form.current.classList.add('was-validated')
        }
    }

    useEffect(() => {
        // debug
        console.log(`user`);
        console.log(user);
        //
        findUserData(user.user.email!).then((userInfo) => {
            user.setUserInfo(userInfo)
        })
        // if user is authorized, get all user data
        //if (user.isAuth) {
        //    findUserData(user.user.email!).then((userInfo) => {
        //        user.setUserInfo(userInfo)
        //    })
        //}

    }, [])


    return (
        <section className="mt-5 mb-5">
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{basket.itemsTotal}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {basket.basketDevices?.map((item) => {
                            return (
                                <li key={item.device?.id}
                                    className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">{item.device.name}</h6>
                                        <small
                                            className="text-muted">{item.quantity === 1 ? `1 item` : `${item.quantity} items`}</small>
                                    </div>
                                    <span className="text-muted">${item.quantity * item.device.price!}</span>
                                </li>
                            )
                        })}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${basket.priceTotal}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <Form method="POST" className="needs-validation" ref={form} noValidate={true}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                       defaultValue={user.user.email ? user.user.email : undefined} required/>
                                <div className="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>

                            {!user.isAuth && (<div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="" required/>
                                <div className="invalid-feedback">
                                    Please enter a valid password.
                                </div>
                            </div>)}

                            <div className="col-12">
                                <label htmlFor="phone" className="form-label">Phone number</label>
                                <input type="tel" className="form-control" id="phone" placeholder=""
                                       defaultValue={(user.isAuth && user.user.userInfo?.phone) ? user.user.userInfo?.phone : undefined}/>
                                <div className="invalid-feedback">
                                    Please enter a valid phone number.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="John"
                                       defaultValue={(user.isAuth && user.user.userInfo?.firstname) ? user.user.userInfo?.firstname : undefined}/>
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Deere"
                                       defaultValue={(user.isAuth && user.user.userInfo?.lastname) ? user.user.userInfo?.lastname : undefined}/>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="addressone" className="form-label">Address</label>
                                <input type="text" className="form-control" id="addressone"
                                       placeholder="st. Main Road 1137" required/>
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="addresstwo" className="form-label">Address 2 <span
                                    className="text-muted">(Optional)</span></label>
                                <input type="text" className="form-control" id="addresstwo"
                                       placeholder="apt. 881"/>
                            </div>

                            <div className="col-md-5">
                                <SelectCountry/>
                            </div>

                            <div className="col-md-4">
                                <SelectCity/>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Postal code</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required/>
                                <div className="invalid-feedback">
                                    Postal code required.
                                </div>
                            </div>
                        </div>
                        <hr className="my-4"/>
                    </Form>
                    <Button
                        className="w-100 btn btn-primary btn-lg"
                        onClick={() => createUserOrder()}
                    >Continue to
                        payment
                    </Button>
                </div>
            </div>
        </section>
    )
})

export default Checkout;