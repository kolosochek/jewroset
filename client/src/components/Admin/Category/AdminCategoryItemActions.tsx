import React, {PropsWithChildren, useState} from 'react';
import ConfirmRemoveCategoryModal from "../../Modals/ConfirmRemoveCategoryModal";
import CategoryModal from "../../Modals/CategoryModal";
import {CategoryI} from "../../../store/DeviceStore";

interface AdminCategoryItemActionsProps extends PropsWithChildren {
    category: CategoryI,
}
const AdminCategoryItemActions:React.FC<AdminCategoryItemActionsProps> = ({category}) => {
    const [isEditCategoryVisible, setEditCategoryVisible] = useState(false)
    const [isConfirmRemoveCategoryModal, setIsConfirmRemoveCategoryModal] = useState(false)


    return (
        <>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditCategoryVisible(true)
                }
            >Edit
            </button>
            <CategoryModal category={category} mode="edit" show={isEditCategoryVisible} onHide={() => setEditCategoryVisible(false)}/>
            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveCategoryModal(true)
            }
            }>Delete
            </button>
            <ConfirmRemoveCategoryModal
                show={isConfirmRemoveCategoryModal}
                onHide={() => {
                    setIsConfirmRemoveCategoryModal(false)
                }}
                categoryId={category.id!}/>
        </>
    )
}

export default AdminCategoryItemActions;