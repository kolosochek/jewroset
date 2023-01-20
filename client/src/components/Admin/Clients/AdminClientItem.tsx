import {UserI} from "../../../store/UserStore";
import {useNavigate} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import { PropsWithChildren } from "react";

interface AdminClientItemProps extends PropsWithChildren {
    user: UserI,
    index: number,
}

const AdminClientItem: React.FC<AdminClientItemProps> = ({user, index}) => {
    const navigate = useNavigate()
    const changeDescriptionLabelArr = ['<=', '=>']

    return (
        <>
            {/* User header */}
            <Row key={user.id} className={`align-items-center mb-2 mt-2 ${index % 2 ? 'bg-light' : ''}`}>
                <Col className="col-1 text-start">{user.id}</Col>
                <Col className="col-5">
                    <a
                        className="link"
                        onClick={() => navigate(`/device/${user.id}`)}
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
                <Col className="text-end col-1">
                    {/* <AdminClientItemActions user={user}/> */}
                </Col>
            </Row>
        </>
    )
}

export default AdminClientItem;