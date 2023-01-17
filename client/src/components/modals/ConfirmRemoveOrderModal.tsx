import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {UserI} from "../../store/UserStore";
import {OrderI} from "../../store/OrderStore";
import {AdminOrderContext} from "../../views/Admin/AdminOrders";

interface ConfirmRemoveOrderModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    adminRemoveOrder: (userId:ConfirmRemoveOrderModalProps['userId'], orderId:ConfirmRemoveOrderModalProps['orderId']) => Promise<Record<string, boolean>>,
    userId: UserI['id'],
    orderId: OrderI['id']
}

const ConfirmRemoveOrderModal: React.FC<ConfirmRemoveOrderModalProps> = ({show, onHide, adminRemoveOrder, userId, orderId}) => {
    const {isRender, setIsRender} = useContext(AdminOrderContext);
    const forceParentRender = () => setIsRender(!isRender);
    const removeOrder = () => {
        adminRemoveOrder(userId, orderId).then((result) => {
            if (result.result === true) {
                forceParentRender()
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
                    Remove this order?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2 className="text-center ">Are you really want to DELETE this order?</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button form="addDeviceForm" className="text-white btn-danger btn-outline-danger"
                        onClick={() => removeOrder()}>REMOVE</Button>
                <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmRemoveOrderModal;