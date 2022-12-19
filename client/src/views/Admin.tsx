import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import CreateCategoryModal from "../components/modals/CreateCategoryModal"
import CreateBrandModal from "../components/modals/CreateBrandModal";
import CreateDeviceModal from "../components/modals/CreateDeviceModal";

const Admin = () => {
    const [isBrandVisible, setBrandVisible] = useState(false)
    const [isCategoryVisible, setCategoryVisible] = useState(false)
    const [isDeviceVisible, setDeviceVisible] = useState(false)

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3 sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <span data-feather="home" className="align-text-bottom"></span>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file" className="align-text-bottom"></span>
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"></span>
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="users" className="align-text-bottom"></span>
                                    Customers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                                    Reports
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="layers" className="align-text-bottom"></span>
                                    Integrations
                                </a>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                            <span>Saved reports</span>
                            <a className="link-secondary" href="#" aria-label="Add a new report">
                                <span data-feather="plus-circle" className="align-text-bottom"></span>
                            </a>
                        </h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Current month
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Last quarter
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Social engagement
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text" className="align-text-bottom"></span>
                                    Year-end sale
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="wrapper d-flex flex-column">
                        <Button className="btn" onClick={() => setCategoryVisible(true)}>add category</Button>
                        <Button className="btn" onClick={() => setBrandVisible(true)}>add brand</Button>
                        <Button className="btn" onClick={() => setDeviceVisible(true)}>add device</Button>
                        <CreateCategoryModal show={isCategoryVisible} onHide={() => setCategoryVisible(false)}/>
                        <CreateBrandModal show={isBrandVisible} onHide={() => setBrandVisible(false)}/>
                        <CreateDeviceModal show={isDeviceVisible} onHide={() => setDeviceVisible(false)}/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;