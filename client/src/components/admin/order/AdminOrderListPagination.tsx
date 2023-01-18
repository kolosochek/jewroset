import React, {PropsWithChildren, useContext, useState} from 'react';
import {Pagination as PaginationBootsrap} from "react-bootstrap";
import {PaginatorI} from "../../../store/DeviceStore";

interface AdminOrderListPaginationProps extends PropsWithChildren {
    page: PaginatorI['page'],
    totalCount: PaginatorI['totalCount'],
    limit: PaginatorI['limit'],
    setPage: (value: PaginatorI['page'] | ((prevVar: PaginatorI['page']) => PaginatorI['page'])) => void,
    setIsLoading: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}
const AdminOrderListPagination:React.FC<AdminOrderListPaginationProps> = ({page, totalCount, limit, setPage, setIsLoading}) => {
    const totalPages = Math.ceil(totalCount / limit)
    const pages:PaginatorI['page'][] = [...Array(totalPages+1).keys()].slice(1)


    if (pages.length > 1) {
        return (
            <div className="d-flex mt-2">
                <PaginationBootsrap className="ms-auto shadow-sm">
                    <PaginationBootsrap.First onClick={() => {setPage(1)}}/>
                    {pages.map((item) => {
                        return (
                            <PaginationBootsrap.Item
                                key={`pagination-page-${item}`}
                                active={item === page}
                                onClick={() => {
                                    setPage(item)
                                    setIsLoading(true)
                                }}
                            >
                                {item}
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