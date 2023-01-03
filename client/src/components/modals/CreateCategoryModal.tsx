import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCategory} from "../../http/deviceAPI";
import {CategoryI} from "../../store/DeviceStore";

interface CreateCategoryModalProps {
    show: boolean,
    onHide: any,
}

const CreateCategoryModal = ({show, onHide}: Partial<CreateCategoryModalProps>) => {
    const [value, setValue] = useState()
    const addCategory = () => {
        createCategory({name: value}).then(data => {
            setValue('' as any)
            onHide()
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
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value as any)}
                        placeholder="New category title"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={addCategory}>Add
                    category</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategoryModal;