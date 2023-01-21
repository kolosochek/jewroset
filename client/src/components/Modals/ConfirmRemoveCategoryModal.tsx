import React, {PropsWithChildren, useContext} from 'react';
import {AdminCategoryContext} from "../../views/Admin/AdminCategories";
import {Modal, Button} from "react-bootstrap";
import {CategoryI} from "../../store/DeviceStore";
import {adminRemoveCategory} from "../../http/categoryAPI";

interface ConfirmRemoveCategoryModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    categoryId: CategoryI['id'],
}
const ConfirmRemoveCategoryModal:React.FC<ConfirmRemoveCategoryModalProps> = ({show, onHide, categoryId}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminCategoryContext)
    const forceRender = () => setIsForceRender(!isForceRender);

    const removeUser = () => {
        adminRemoveCategory(categoryId).then((result) => {
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
                Remove this category?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2 className="text-center ">Are you really want to DELETE this category?</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button className="text-white btn-danger btn-outline-danger"
                    onClick={() => removeUser()}>REMOVE</Button>
            <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ConfirmRemoveCategoryModal;