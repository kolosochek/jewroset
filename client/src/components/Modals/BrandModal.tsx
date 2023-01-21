import React, {PropsWithChildren, SetStateAction, useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {BrandI} from "../../store/DeviceStore";
import {AdminBrandContext} from "../../views/Admin/AdminBrands";
import {adminCreateBrand, adminUpdateBrand} from "../../http/brandAPI";

type ModeT = "create" | "edit"
interface BrandModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    brand?: BrandI,
}

const BrandModal: React.FC<BrandModalProps> = ({show, onHide, mode, brand}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminBrandContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [name, setName] = useState<BrandI["name"]>(mode === "edit" ? brand?.name! : '')


    const createNewBrand = (brandObj: BrandI) => {
        adminCreateBrand(brandObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const updateExistingBrand = (brandObj: BrandI) => {
        adminUpdateBrand(brandObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const manageBrand = () => {
        const form: HTMLFormElement = document.querySelector('form.needs-validation')!
        const brandObj: BrandI = {
            "name": name,
        } as BrandI

        // if form is valid
        if (form.checkValidity()) {
            if (mode === 'create') {
                createNewBrand(brandObj)
            } else if (mode === 'edit') {
                updateExistingBrand(brandObj)
            }
        }

        form.classList.add('was-validated')

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
                    {mode === 'create' ? "Create new" : 'Edit'} brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="New brand title"
                        required
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={manageBrand}>{mode === 'edit' ? 'Edit' : "Create new"} brand</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BrandModal;