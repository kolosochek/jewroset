import React, {PropsWithChildren, SetStateAction, useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {BrandI} from "../../store/DeviceStore";
import {AdminBrandContext} from "../../views/Admin/AdminBrands";
import {adminCreateBrand, adminUpdateBrand, getAllBrands} from "../../http/brandAPI";
import {Context} from "../../index";
import {getAllCategories} from "../../http/categoryAPI";

type ModeT = "create" | "edit"
interface BrandModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    brand?: BrandI,
}

const BrandModal: React.FC<BrandModalProps> = ({show, onHide, mode, brand}) => {
    const {device} = useContext(Context)
    const {isForceRender, setIsForceRender} = useContext(AdminBrandContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [name, setName] = useState<BrandI["name"]>(mode === "edit" ? brand?.name! : '')
    const [categoryId, setCategoryId] = useState<BrandI["categoryId"]>(mode === "edit" ? brand?.categoryId! : 0)


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
            "categoryId": categoryId,
        } as BrandI

        // if form is valid
        if (form.checkValidity()) {
            if (mode === 'create') {
                createNewBrand(brandObj)
            } else if (mode === 'edit') {
                brandObj.id = brand?.id!
                updateExistingBrand(brandObj)
            }
        }

        form.classList.add('was-validated')

    }

    useEffect(() => {
        if (!device.categories?.length) {
            getAllCategories().then(categoriesParam => device.setCategories(categoriesParam))
        }
    }, [show])


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
                <Form id="brandForm" className="needs-validation" noValidate={true} >
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="brand">Brand title</Form.Label>
                        <Form.Control
                            value={name}
                            name="brand"
                            type="text"
                            onChange={e => setName(e.target.value)}
                            placeholder="New brand title"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Form.Label className="form-label" htmlFor="category">Category</Form.Label>
                        <Form.Select
                            as="select"
                            id="category"
                            onChange={e => setCategoryId(+e.currentTarget.value)}
                            value={categoryId}
                            className="form-control"
                            required
                        >
                            {device.categories.map((category) => {
                                return (
                                    <option key={category?.id} value={category.id}>{category?.name}</option>
                                )
                            })}
                        </Form.Select>
                        <div className="invalid-feedback mb-2">
                            Please choose a valid category.
                        </div>
                    </div>
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