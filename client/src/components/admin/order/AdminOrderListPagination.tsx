import React, {PropsWithChildren, useContext, useState} from 'react';
import {Pagination as PaginationBootsrap} from "react-bootstrap";
import {PaginatorI} from "../../../store/DeviceStore";
import {BasketDeviceI} from "../../../store/BasketStore";

interface AdminOrderListPaginationProps extends PropsWithChildren {
    page: PaginatorI['page'],
    totalCount: number,
    limit: PaginatorI['limit']
    setPage: (value: PaginatorI['page'] | ((prevVar: PaginatorI['page']) => number)) => void;
}
const AdminOrderListPagination:React.FC<AdminOrderListPaginationProps> = ({page, totalCount, limit, setPage}) => {
    const [activePage, setActivePage] = useState<PaginatorI['page']>(page)
    const totalPages = Math.ceil(totalCount / limit)
    const pages:number[] = [...Array(totalPages).keys()].slice(1)

    if (pages.length > 1) {
        return (
            <div className="d-flex mt-2">
                <PaginationBootsrap className="ms-auto shadow-sm">
                    <PaginationBootsrap.First onClick={() => {setPage(1)}}/>
                    {pages.map((page, index) => {
                        return (
                            <PaginationBootsrap.Item
                                key={`pagination-page-${page}`}
                                active={page === index}
                                onClick={() => {setPage(page)}}
                            >
                                {page}
                            </PaginationBootsrap.Item>
                        )
                    })}
                    <PaginationBootsrap.Last onClick={() => {setPage(totalPages)}}/>
                </PaginationBootsrap>
            </div>
        )
    } else return <></>

}

export default AdminOrderListPagination;