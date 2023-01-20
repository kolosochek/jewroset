import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {UserI} from "../store/UserStore";
import {findUserData, setUserCookie, updateUser} from "../http/userAPI";
import {useCookies} from "react-cookie";
import {OrderI} from "../store/OrderStore";
import {createOrder} from "../http/orderAPI";
import {useNavigate} from "react-router-dom";
import {RouteI} from "../utils/Routes";
import {clearBasket} from "../http/basketAPI";
import SelectCountry from "../components/SelectCountry";
import SelectCity from "../components/SelectCity";

const Checkout = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {order} = useContext(Context)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["userEmail"]);

    const createUserOrder = (form:HTMLFormElement) => {
        // Order
        const orderObj: Partial<OrderI> = {
            userId: user.id,
            basketId: basket.id,
            addressone: (form.querySelector('input#addressone') as HTMLInputElement).value ?? undefined,
            addresstwo: (form.querySelector('input#addresstwo') as HTMLInputElement).value ?? undefined,
            country: (form.querySelector('select#country') as HTMLSelectElement).value ?? undefined,
            city: (form.querySelector('select#city') as HTMLSelectElement).value ?? undefined,
            zip: (form.querySelector('input#zip') as HTMLInputElement).value ?? undefined,
            status: "awaitingPayment"
        }
        // create new Order
        createOrder(orderObj).then(orderParam => {
            // clear basket
            clearBasket(user.id!, basket.id!).then((newBasket) => {
                basket.setBasket(newBasket)
            })
        })
    }


    useEffect(() => {
        // if user is authorized, get all user data
        if (user.isAuth) {
            findUserData(user.user.email!).then((userInfo) => {
                user.setUserInfo(userInfo)
            })
        }


        const form: HTMLFormElement = document.querySelector('form.needs-validation')!
        // validation
        if (form !== null) {
            form.addEventListener('submit', (e: SubmitEvent) => {
                e.preventDefault()
                e.stopPropagation()

                // if form is valid
                if (form.checkValidity()) {
                    const userObj: Partial<UserI> = {
                        phone: (form.querySelector('input#phone') as HTMLInputElement).value ?? undefined,
                        firstName: (form.querySelector('input#firstName') as HTMLInputElement).value ?? undefined,
                        lastName: (form.querySelector('input#lastName') as HTMLInputElement).value ?? undefined,
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
                        userObj.newEmail = (form.querySelector('input#email') as HTMLInputElement).value
                        userObj.password = (form.querySelector('input#password') as HTMLInputElement).value

                        updateUser(userObj).then(userParam => {
                            user.setUser(userParam as unknown as UserI)
                            user.setIsAuth(true)
                            setUserCookie(user.user.email!, setCookie)
                        })
                    }

                    // create new Order
                    createUserOrder(form)
                    navigate('/payment' as RouteI['path'])
                }

                form.classList.add('was-validated')
            })
        }

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
                    <form method="POST" className="needs-validation" noValidate={true}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                       value={(user.isAuth && user.user.email) ? user.user.email : undefined} required/>
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
                                <SelectCountry />
                            </div>

                            <div className="col-md-4">
                                <SelectCity />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="zip" className="form-label">Postal code</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required/>
                                <div className="invalid-feedback">
                                    Postal code required.
                                </div>
                            </div>
                        </div>

                        {/*
                        <hr className="my-4"/>

                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input id="credit" name="paymentMethod" type="radio"
                                       className="form-check-input" defaultChecked/>
                                <label className="form-check-label" htmlFor="credit">Credit card</label>
                            </div>
                            <div className="form-check">
                                <input id="debit" name="paymentMethod" type="radio" className="form-check-input"/>
                                <label className="form-check-label" htmlFor="debit">Debit card</label>
                            </div>
                            <div className="form-check">
                                <input id="paypal" name="paymentMethod" type="radio"
                                       className="form-check-input"/>
                                <label className="form-check-label" htmlFor="paypal">PayPal</label>
                            </div>
                        </div>

                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label htmlFor="cc-name" className="form-label">Name on card</label>
                                <input type="text" className="form-control" id="cc-name" placeholder=""/>
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                <input type="text" className="form-control" id="cc-number" placeholder=""/>
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                <input type="text" className="form-control" id="cc-expiration" placeholder=""/>
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                <input type="text" className="form-control" id="cc-cvv" placeholder=""/>
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>

                        <hr className="my-4"/>
                        */}

                        <hr className="my-4"/>

                        <button
                            className="w-100 btn btn-primary btn-lg"
                            type="submit"
                        >Continue to
                            payment
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
})

export default Checkout;