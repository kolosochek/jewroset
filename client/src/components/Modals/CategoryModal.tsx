import React, {PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {CategoryI} from "../../store/DeviceStore";
import {AdminCategoryContext} from "../../views/Admin/AdminCategories";
import {adminCreateCategory, adminUpdateCategory, getAllCategories} from "../../http/categoryAPI";
import {getAllBrands} from "../../http/brandAPI";

type ModeT = "create" | "edit"
interface CategoryModalProps extends PropsWithChildren {
    show: boolean,
    onHide: () => void | undefined,
    mode: ModeT,
    category?: CategoryI,
}

const CategoryModal: React.FC<CategoryModalProps> = ({show, onHide, mode, category}) => {
    const {isForceRender, setIsForceRender} = useContext(AdminCategoryContext);
    const forceRender = () => setIsForceRender(!isForceRender);
    const [name, setName] = useState<CategoryI["name"]>(mode === "edit" ? category?.name! : '')
    const form = useRef<HTMLFormElement | null>(null)


    const createNewCategory = (categoryObj: CategoryI) => {
        adminCreateCategory(categoryObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const updateExistingCategory = (categoryObj: CategoryI) => {
        adminUpdateCategory(categoryObj).then(() => {
            forceRender()
            onHide()
        })
    }

    const manageCategory = () => {
        const categoryObj: CategoryI = {
            "name": name,
        } as CategoryI

        if (form && form.current) {
            // if form is valid
            if (form.current.checkValidity()) {
                if (mode === 'create') {
                    createNewCategory(categoryObj)
                } else if (mode === 'edit') {
                    categoryObj.id = category?.id!
                    updateExistingCategory(categoryObj)
                }
            }

            form.current.classList.add('was-validated')
        }
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
                    {mode === 'create' ? "Create new" : 'Edit'} category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="categoryForm" className="needs-validation" ref={form} noValidate={true} >
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="New category title"
                        required
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white btn-success btn-outline-success" onClick={manageCategory}>{mode === 'edit' ? 'Edit' : "Create new"} category</Button>
                <Button className="text-white btn-danger btn-outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryModal;