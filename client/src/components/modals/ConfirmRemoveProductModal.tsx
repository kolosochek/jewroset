import React, {useContext} from 'react';
import {DeviceI} from "../../store/DeviceStore";
import {Modal, Button} from "react-bootstrap";
import {AdminProductContext} from "../../views/Admin/AdminProducts";
import {adminRemoveDevice} from "../../http/deviceAPI";

interface ConfirmRemoveProductModalProps extends React.PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    deviceId: DeviceI['id'],
}

const ConfirmRemoveProductModal: React.FC<ConfirmRemoveProductModalProps> = ({show, onHide, deviceId}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminProductContext)
    const forceRender = () => setIsForceRender(!isForceRender);

    const removeDevice = () => {
    adminRemoveDevice(deviceId).then((result) => {
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
                Remove this device?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2 className="text-center ">Are you really want to DELETE this device?</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button form="addDeviceForm" className="text-white btn-danger btn-outline-danger"
                    onClick={() => removeDevice()}>REMOVE</Button>
            <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
)
}

export default ConfirmRemoveProductModal;