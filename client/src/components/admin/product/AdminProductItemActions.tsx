import React, {PropsWithChildren, useState} from 'react';
import OrderModal from "../../modals/OrderModal";
import ConfirmRemoveOrderModal from "../../modals/ConfirmRemoveOrderModal";
import {adminRemoveOrder} from "../../../http/orderAPI";
import {DeviceI} from "../../../store/DeviceStore";

interface AdminProductItemActionsProps extends PropsWithChildren {
    device: DeviceI,
}
const AdminProductItemActions:React.FC<AdminProductItemActionsProps> = ({device}) => {
    const [isEditProductVisible, setEditProductVisible] = useState(false)
    const [isConfirmRemoveProductModal, setIsConfirmRemoveProductModal] = useState(false)

    return (
        <>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditProductVisible(true)
                }
            >Edit
            </button>

            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveProductModal(true)
            }
            }>Delete
            </button>

        </>
    )
}

export default AdminProductItemActions;