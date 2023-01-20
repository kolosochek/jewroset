import React, {PropsWithChildren, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {RouteI} from "../../utils/Routes";

interface AdminSidebarProps extends PropsWithChildren {
    activeItem: string,
}
const AdminSidebar:React.FC<AdminSidebarProps> = (children) => {
    const [sidebarItem, setSidebarItem] = useState(children.activeItem)

    return (
        <aside className="col-2 flex-inline">
            <ListGroup className="list-unstyled ps-0 shadow-sm">
                <ListGroup.Item
                    key='dashboard'
                    active={sidebarItem === 'Admin'}
                    className=""
                >
                    <Link to={`/admin` as RouteI['path']}
                          key="dashboard"
                          onClick={() => setSidebarItem('Admin')}
                          className={`d-block text-decoration-none ${(sidebarItem === 'Admin') ? 'text-white d-block text-decoration-none' : 'text-black'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="feather feather-home align-text-bottom"
                             aria-hidden="true">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        &nbsp;Dashboard
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    key='products'
                    active={sidebarItem === 'products'}
                    className=""
                >
                    <Link to={`/admin/products` as RouteI['path']}
                          key="products"
                          onClick={() => setSidebarItem('products')}
                          className={`d-block text-decoration-none ${(sidebarItem === 'products') ? 'text-white d-block text-decoration-none' : 'text-black'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="feather feather-file align-text-bottom"
                             aria-hidden="true">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                        &nbsp;Products
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    key='orders'
                    active={sidebarItem === 'orders'}
                    className=""
                >
                    <Link to={`/admin/orders` as RouteI['path']}
                          key="orders"
                          onClick={() => setSidebarItem('orders')}
                          className={`d-block text-decoration-none ${(sidebarItem === 'orders') ? 'text-white d-block text-decoration-none' : 'text-black '}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="feather feather-shopping-cart align-text-bottom"
                             aria-hidden="true">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        &nbsp;Orders
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item
                    key='clients'
                    active={sidebarItem === 'clients'}
                    className=""
                >
                    <Link to={`/admin/clients` as RouteI['path']}
                          key="clients"
                          onClick={() => setSidebarItem('clients')}
                          className={`d-block text-decoration-none ${(sidebarItem === 'clients') ? 'text-white d-block text-decoration-none' : 'text-black'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="feather feather-users align-text-bottom"
                             aria-hidden="true">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        &nbsp;Clients
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </aside>
    )
}

export default AdminSidebar;