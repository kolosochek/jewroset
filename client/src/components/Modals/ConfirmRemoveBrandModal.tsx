import React, {PropsWithChildren, useContext} from 'react';
import {AdminClientContext} from "../../views/Admin/AdminClients";
import {Modal, Button} from "react-bootstrap";
import {BrandI} from "../../store/DeviceStore";
import {adminRemoveBrand} from "../../http/brandAPI";

interface ConfirmRemoveBrandModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    brandId: BrandI['id'],
}
const ConfirmRemoveBrandModal:React.FC<ConfirmRemoveBrandModalProps> = ({show, onHide, brandId}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminClientContext)
    const forceRender = () => setIsForceRender(!isForceRender);

    const removeUser = () => {
        adminRemoveBrand(brandId).then((result) => {
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
                Remove this brand?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2 className="text-center ">Are you really want to DELETE this brand?</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button className="text-white btn-danger btn-outline-danger"
                    onClick={() => removeUser()}>REMOVE</Button>
            <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ConfirmRemoveBrandModal;