import {UserI} from "../../../store/UserStore";
import {Row, Col} from "react-bootstrap";
import React, { PropsWithChildren } from "react";
import AdminClientItemActions from "./AdminClientItemActions";

interface AdminClientItemProps extends PropsWithChildren {
    user: UserI,
    index: number,
}
const AdminClientItem: React.FC<AdminClientItemProps> = ({user, index}) => {

    return (
        <>
            {/* User header */}
            <Row className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
                <Col className="col-1 text-start">{user.id}</Col>
                <Col className="col-3">
                    <a
                        className="link"
                        role="button"
                    >{user.email}</a>
                </Col>
                <Col className="text-center">
                    {user.firstname}
                </Col>
                <Col className="text-center">
                    {user.lastname}
                </Col>
                <Col className="text-center">{user.role}</Col>
                <Col className="text-center col-2">{user.phone}</Col>
                <Col className="text-end col-2">
                    <AdminClientItemActions user={user}/>
                </Col>
            </Row>
        </>
    )
}

export default AdminClientItem;