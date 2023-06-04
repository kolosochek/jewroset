import {useContext, useEffect, useRef, useState} from 'react';
import {Row, Container} from "react-bootstrap";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import AdminAccessDenied from "../../components/Admin/AdminAccessDenied";
import {Loader} from "../../components/Loader/Loader";
import {adminGetAllOrders, adminGetAllUnshippedOrders} from "../../http/orderAPI";
import {adminGetAllUsers} from "../../http/userAPI";
import {OrderI} from "../../store/OrderStore";
import {Histogram} from "../../components/Admin/Histogram/Histogram";

interface DashboardPropsI {
    totalOrders: OrderI[];
    totalOrdersCount: number;
    totalUsers: number;
}
const AdminDashboard = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const adminSection = location.pathname.split('/').pop()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalOrders, setTotalOrders] = useState<DashboardPropsI["totalOrders"]>([])
    const [totalOrdersCount, setTotalOrdersCount] = useState<DashboardPropsI["totalOrdersCount"]>(0)
    const [totalUsers, setTotalUsers] = useState<DashboardPropsI["totalUsers"]>(0)
    const [totalOrdersUnshipped, setTotalOrdersUnshipped] = useState<DashboardPropsI["totalOrdersCount"]>(0)
    const totalOrdersIDArr = useRef<number[]>([])

    useEffect(() => {
        Promise.allSettled([
            // get all orders
            adminGetAllOrders(1, 999)
            .then(data => {
                setTotalOrders(data.rows)
                setTotalOrdersCount(data.count)
                // populate chart array
                data.rows.forEach((item:OrderI) => {
                    return totalOrdersIDArr.current.push(item.id);
                })
            })
            .catch(e => {throw new Error(`Can't fetch all orders`)}),
            //all users
            adminGetAllUsers().then(data => {
                setTotalUsers(data.count)
            }).catch(e => {throw new Error(`Can't fetch all users`)}),
            //all unshipped orders
            adminGetAllUnshippedOrders().then(data => {
                setTotalOrdersUnshipped(data.count)
            }).catch(e => {throw new Error(`Can't fetch all unshipped orders`)}),
        ]).finally(() => {
            setIsLoading(false)
        })

    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        user.isAdmin
            ? (<Container className="p-0 pt-3 pb-3">
                <Row>
                    <AdminSidebar activeItem={adminSection!}/>
                    <section className="col-10">
                        <Row className="wrapper d-flex flex-column">
                            <p>Orders total: {totalOrdersCount}</p>
                            <p>Clients total: {totalUsers}</p>
                            <p>Unshipped orders: {totalOrdersUnshipped}</p>
                        </Row>
                        <Row>
                            <Histogram width={600} height={600} data={totalOrdersIDArr.current} />
                        </Row>
                    </section>
                </Row>
            </Container>)
            : (<AdminAccessDenied />)
    )
}

export default AdminDashboard;