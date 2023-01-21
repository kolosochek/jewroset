import React, {PropsWithChildren, useContext} from 'react';
import {UserI} from "../../store/UserStore";
import {AdminClientContext} from "../../views/Admin/AdminClients";
import {adminRemoveUser} from "../../http/userAPI";
import {Modal, Button} from "react-bootstrap";

interface ConfirmRemoveClientModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    userId: UserI['id'],
}
const ConfirmRemoveClientModal:React.FC<ConfirmRemoveClientModalProps> = ({show, onHide, userId}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminClientContext)
    const forceRender = () => setIsForceRender(!isForceRender);

    const removeUser = () => {
        adminRemoveUser(userId).then((result) => {
            if (result.result === true) {
                forceRender()
                onHide()
            }
        })
    }


    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Remove this client?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2 className="text-center ">Are you really want to DELETE this client?</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button className="text-white btn-danger btn-outline-danger"
                    onClick={() => removeUser()}>REMOVE</Button>
            <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ConfirmRemoveClientModal;