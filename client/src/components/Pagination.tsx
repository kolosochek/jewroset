import React, {useContext} from 'react';
import {Pagination as PaginationBootsrap} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Pagination = observer(() => {
    const {device} = useContext(Context)
    const totalPages = Math.ceil(device.totalCount / device.limit)
    const pages:number[] = [...Array(totalPages+1).keys()].slice(1)

    if (pages.length > 1) {
        return (
            <div className="d-flex mt-2">
                <PaginationBootsrap className="ms-auto shadow-sm">
                    <PaginationBootsrap.First onClick={() => {device.setPage(1)}}/>
                    {pages.map((page) => {
                        return (
                            <PaginationBootsrap.Item
                                key={page}
                                active={device.page === page}
                                onClick={() => {device.setPage(page)}}
                            >
                                {`${page}`}
                            </PaginationBootsrap.Item>
                        )
                    })}
                    <PaginationBootsrap.Last onClick={() => {device.setPage(totalPages)}}/>
                </PaginationBootsrap>
            </div>
        )
    } else return <></>

})

export default Pagination;