import React, {useContext, useEffect, useState} from 'react';
import {PaginatorI} from "../../../store/DeviceStore";
import {Spinner} from "react-bootstrap";
import {AdminClientContext, AdminClientFilterI} from "../../../views/Admin/AdminClients";
import AdminPagination from "../AdminPagination";
import {UserI} from "../../../store/UserStore";
import {adminGetAllUsers} from "../../../http/userAPI";
import AdminClientListHeader from "./AdminClientListHeader";
import AdminClientListActions from "./AdminClientListActions";
import AdminClientItem from "./AdminClientItem";
import {Loader} from "../../Loader/Loader";

const AdminClientList = () => {
    const [users, setUsers] = useState<UserI[]>([]);
    const {isForceRender, setIsForceRender} = useContext(AdminClientContext)
    // pagination
    const [totalCount, setTotalCount] = useState<PaginatorI['totalCount']>(0);
    const [page, setPage] = useState<PaginatorI["page"]>(1);
    const limit = 10;
    // filterbar
    const [orderBy, setOrderBy] = useState<AdminClientFilterI['orderBy']>('id')
    const [orderDirection, setOrderDirection] = useState<AdminClientFilterI['orderDirection']>('desc')
    // loading
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        adminGetAllUsers(page, limit, orderBy, orderDirection).then(users => {
            setUsers(users.rows)
            setTotalCount(users.count)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [isForceRender, page, orderBy, orderDirection])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="col-10">
            <div className="wrapper d-flex flex-column">
                <AdminClientListActions
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    orderDirection={orderDirection}
                    setOrderDirection={setOrderDirection}
                    setPage={setPage}
                />
                <section className="mt-3 mb-3">
                    {users
                        ? (<>
                            <AdminClientListHeader />
                            {(users as UserI[]).map((user: UserI, index) => {
                                return (
                                    <AdminClientItem key={user.id} user={user} index={index}  />
                                )
                            })}
                        </>)
                        : (<h3>No items in this section</h3>)
                    }
                </section>
            </div>
            <AdminPagination page={page} totalCount={totalCount} limit={limit} setPage={setPage} setIsForceRender={setIsForceRender} isForceRender={isForceRender}/>
        </section>
    )
}

export default AdminClientList;