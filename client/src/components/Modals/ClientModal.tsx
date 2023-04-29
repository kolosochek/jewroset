import React, {PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import {UserI} from "../../store/UserStore";
import {AdminClientContext} from "../../views/Admin/AdminClients";
import {adminCreateUser, adminUpdateUser} from "../../http/userAPI";
import {Modal, Form, Row, Col, Button} from "react-bootstrap";
import {switchTitle} from "../../views/Orders";

type ModeT = "create" | "edit"

interface ClientModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    user?: UserI,
}

const ClientModal: React.FC<ClientModalProps> = ({show, onHide, mode, user}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminClientContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [email, setEmail] = useState<UserI["email"]>(mode === 'edit' ? user?.email! : '')
    const [password, setPassword] = useState<UserI["password"]>(mode === 'edit' ? undefined : '')
    const [role, setRole] = useState<UserI["role"]>(mode === 'edit' ? user?.role! : undefined)
    const [firstname, setFirstname] = useState<UserI["firstname"]>(mode === 'edit' ? user?.firstname! : '')
    const [lastname, setLastname] = useState<UserI["lastname"]>(mode === 'edit' ? user?.lastname! : '')
    const [phone, setPhone] = useState<UserI["firstname"]>(mode === 'edit' ? user?.phone! : '')
    const changePasswordLabelArr = ['Collapse', 'Change password']
    const form = useRef<HTMLFormElement | null>(null)

    const manageUser = () => {
        const userObj: UserI = {
            "email": email,
            "password": password,
            "role": role ? role : "USER" as UserI['role'],
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
        } as UserI

        if (form && form.current) {
            // if form is valid
            if (form.current.checkValidity()) {
                if (mode === 'create') {
                    createNewUser(userObj)
                } else if (mode === 'edit') {
                    updateExistingUser(userObj)
                }
            }

            form.current.classList.add('was-validated')
        }

    }
    const createNewUser = (userObj: UserI) => {
        // send api request to create new user
        adminCreateUser(userObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const updateExistingUser = (userObj: UserI) => {
        adminUpdateUser(userObj).then(() => {
            forceRender()
            onHide()
        })
    }

    useEffect(() => {

    }, [show])


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="deviceForm" className="needs-validation" ref={form} noValidate={true}>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="email">Email</Form.Label>
                        <Form.Control
                            onChange={e => setEmail(e.target!.value)}
                            value={email}
                            name="email"
                            className="form-control"
                            placeholder="some@email.com"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid email.
                        </div>
                    </div>
                    {mode === 'create' && (<div className="mb-2">
                        <Form.Label className="form-label" htmlFor="password">Password</Form.Label>
                        <Form.Control
                            onChange={e => setPassword(e.target!.value)}
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="********"
                            required
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid password.
                        </div>
                    </div>)
                    }
                    {mode === 'edit' && (
                            <div className="mb-2">
                                <Form.Label className="form-label" htmlFor="password">Password</Form.Label>
                                <div className="mb-2">
                                    <Button
                                        className="btn btn-primary"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#changePassword"
                                        aria-expanded="false"
                                        aria-controls="changePassword"
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            switchTitle((e.target as HTMLButtonElement), changePasswordLabelArr)
                                        }}
                                    >{changePasswordLabelArr[1]}</Button>
                                </div>
                                <Form.Control
                                    id="changePassword"
                                    onChange={e => setPassword(e.target!.value)}
                                    value={password}
                                    name="password"
                                    type="password"
                                    className="collapse form-control"
                                    placeholder="********"
                                />
                                <div className="invalid-feedback mb-2">
                                    Please enter a valid password.
                                </div>
                            </div>
                    )}
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="role">Role</Form.Label>
                        <Form.Select
                            as="select"
                            id="role"
                            onChange={e => setRole(e.target.value as UserI['role'])}
                            value={role}
                            className="form-control"
                            required
                        >
                            <option value="GUEST">GUEST</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please select a valid user role.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="firstname">First name</Form.Label>
                        <Form.Control
                            onChange={e => setFirstname(e.target!.value)}
                            value={firstname}
                            name="firstname"
                            placeholder="John"
                            className="form-control"
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid first name.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="lastname">Last name</Form.Label>
                        <Form.Control
                            onChange={e => setLastname(e.target!.value)}
                            value={lastname}
                            name="lastname"
                            placeholder="Wayne"
                            className="form-control"
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid last name.
                        </div>
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="phone">Phone</Form.Label>
                        <Form.Control
                            onChange={e => setPhone(e.target!.value)}
                            value={phone}
                            name="phone"
                            className="form-control"
                            placeholder="+342 111 222 3882"
                        />
                        <div className="invalid-feedback mb-2">
                            Please enter a valid phone number.
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="text-white btn-success btn-outline-success"
                    onClick={manageUser}
                >{`${mode && mode === 'edit' ? 'Change' : 'Create'} client`}</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ClientModal;