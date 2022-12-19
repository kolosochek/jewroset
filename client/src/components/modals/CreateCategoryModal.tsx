import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

interface CreateCategoryModalProps {
    show: boolean,
    onHide: any,
}
const CreateCategoryModal = ({show, onHide}:Partial<CreateCategoryModalProps>) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="New category title"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={onHide}>Add category</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategoryModal;