import React, {useContext} from 'react';
import {Context} from "../index";
import {findOrCreateOrder} from "../http/orderAPI";
import {observer} from "mobx-react-lite";
import {UserI} from "../store/UserStore";
import {updateUser} from "../http/userAPI";
import {useCookies} from "react-cookie";

const Checkout = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {order} = useContext(Context)
    const [cookies, setCookie] = useCookies(["userEmail"]);

    const setUserCookie = (userEmail:UserI['email'] = user.user.email!) => {
        setCookie("userEmail", userEmail, {
            path: "/",
            maxAge: 24*60*60*183 // 6 month,
        });
    }

    // validation
    const forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event: SubmitEvent) {
            event.preventDefault()
            event.stopPropagation()
            // debug
            console.log(`basket.basket`)
            console.log(basket.basket)
            //

            //if (form.checkValidity()) {
            if (!form.checkValidity()) {
                const userObj: Partial<UserI> = {
                    email: user.user.email,
                    phone: form.querySelector('input#phone').value ?? undefined,
                    firstName: form.querySelector('input#phone').value ?? undefined,
                    lastName: form.querySelector('input#phone').value ?? undefined,
                    role: "USER"
                }
                // if user is authorized
                if (user.isAuth) {
                    userObj.password = form.querySelector('input#password').value

                    updateUser(userObj).then(userParam => {
                        // debug
                        console.log(`userParam`)
                        console.log(userParam)
                        //
                        user.setUser(userParam as unknown as UserI)
                        setUserCookie(userObj.email)
                    })
                } else {
                    userObj.newEmail = form.querySelector('input#email').value

                    updateUser(userObj).then(userParam => {
                        // debug
                        console.log(`userParam`)
                        console.log(userParam)
                        //
                        user.setUser(userParam as unknown as UserI)
                        setUserCookie(userObj.newEmail)
                    })
                }

                /*
                // create or find new order with given basketId
                const formData = new FormData(form)
                findOrCreateOrder(
                    user.id!,
                    basket.id!,
                    formData,
                ).then((orderParam) => {
                    // debug
                    console.log(`orderParam`)
                    console.log(orderParam)
                    //
                    order.setOrder(orderParam)
                })

                 */
            }

            form.classList.add('was-validated')
        }, false)
    })


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
                    <form method="GET" className="needs-validation" noValidate>
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
                                <input type="tel" className="form-control" id="phone" placeholder=""/>
                                <div className="invalid-feedback">
                                    Please enter a valid phone number.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder=""
                                       value={user.isAuth && user.user.firstName ? user.user.firstName : undefined} />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder=""
                                       value={user.isAuth && user.user.lastName ? user.user.lastName : undefined}/>
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address"
                                       placeholder="st. Main Road 1137"/>
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="address2" className="form-label">Address 2 <span
                                    className="text-muted">(Optional)</span></label>
                                <input type="text" className="form-control" id="address2"
                                       placeholder="apt. 881"/>
                            </div>

                            <div className="col-md-5">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select className="form-select" id="country" required>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="city" className="form-label">City</label>
                                <select className="form-select" id="city" required>
                                    <option value="">Choose...</option>
                                    <option>Detroit</option>
                                    <option>Philadelphia</option>
                                    <option>New York</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid city.
                                </div>
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

                        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to
                            checkout
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
})

export default Checkout;