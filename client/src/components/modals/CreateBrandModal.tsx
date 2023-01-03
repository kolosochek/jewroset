import React, {SetStateAction, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";


interface CreateBrandModalProps {
    show: boolean,
    onHide: any,
}

const CreateBrandModal = ({show, onHide}: Partial<CreateBrandModalProps>) => {
    const [value, setValue] = useState()
    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('' as SetStateAction<any>)
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
                        placeholder="New brand title"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={addBrand}>Add brand</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrandModal;