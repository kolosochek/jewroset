import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {OrderI} from "../../store/OrderStore";
import {adminRemoveOrder} from "../../http/orderAPI";

interface ConfirmRemoveOrderModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    orderId: OrderI['id'],
    isForceParentRender: boolean,
    setIsForceParentRender: (value: boolean | ((varPrev: boolean) => boolean)) => void,
}

const ConfirmRemoveOrderModal: React.FC<ConfirmRemoveOrderModalProps> = ({show, onHide, orderId, isForceParentRender, setIsForceParentRender}) => {
    const removeOrder = () => {
        adminRemoveOrder(orderId).then((result) => {
            if (result.result === true) {
                setIsForceParentRender(!isForceParentRender)
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