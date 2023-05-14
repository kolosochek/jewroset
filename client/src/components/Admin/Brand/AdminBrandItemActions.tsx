import React, {PropsWithChildren, useState} from 'react';
import ConfirmRemoveBrandModal from "../../Modals/ConfirmRemoveBrandModal";
import {BrandI} from "../../../store/DeviceStore";
import BrandModal from "../../Modals/BrandModal";

interface AdminBrandItemActionsProps extends PropsWithChildren {
    brand: BrandI,
}
const AdminBrandItemActions:React.FC<AdminBrandItemActionsProps> = ({brand}) => {
    const [isEditBrandVisible, setEditBrandVisible] = useState(false)
    const [isConfirmRemoveBrandModal, setIsConfirmRemoveBrandModal] = useState(false)


    return (
        <>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditBrandVisible(true)
                }
            >Edit
            </button>
            <BrandModal brand={brand} mode="edit" show={isEditBrandVisible} onHide={() => setEditBrandVisible(false)}/>
            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveBrandModal(true)
            }
            }>Delete
            </button>
            <ConfirmRemoveBrandModal
                show={isConfirmRemoveBrandModal}
                onHide={() => {
                    setIsConfirmRemoveBrandModal(false)
                }}
                brandId={brand.id!}/>
        </>
    )
}

export default AdminBrandItemActions;