import React, {PropsWithChildren} from 'react';
import {Pagination as PaginationBootsrap} from "react-bootstrap";
import {PaginatorI} from "../../store/DeviceStore";

interface AdminPaginationProps extends PropsWithChildren {
    page: PaginatorI['page'],
    totalCount: PaginatorI['totalCount'],
    limit: PaginatorI['limit'],
    setPage: (value: PaginatorI['page'] | ((prevVar: PaginatorI['page']) => PaginatorI['page'])) => void,
    isForceRender: boolean,
    setIsForceRender: (bool: boolean) => void,
}
const AdminPagination:React.FC<AdminPaginationProps> = ({page, totalCount, limit, setPage, isForceRender, setIsForceRender}) => {
    const totalPages = Math.ceil(totalCount / limit)
    const pages:PaginatorI['page'][] = [...Array(totalPages+1).keys()].slice(1)
    const forceRender = () => setIsForceRender(!isForceRender)


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
                                    forceRender()
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

export default AdminPagination;