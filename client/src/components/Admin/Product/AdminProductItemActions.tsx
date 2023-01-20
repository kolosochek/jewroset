import React, {PropsWithChildren, useState} from 'react';
import {DeviceI} from "../../../store/DeviceStore";
import ConfirmRemoveProductModal from "../../Modals/ConfirmRemoveProductModal";
import DeviceModal from "../../Modals/DeviceModal";

interface AdminProductItemActionsProps extends PropsWithChildren {
    device: DeviceI,
}

const AdminProductItemActions: React.FC<AdminProductItemActionsProps> = ({device}) => {
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
            <DeviceModal deviceParam={device} mode="edit" show={isEditProductVisible} onHide={() => setEditProductVisible(false)}/>
            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveProductModal(true)
            }
            }>Delete
            </button>
            <ConfirmRemoveProductModal
                show={isConfirmRemoveProductModal}
                onHide={() => {
                    setIsConfirmRemoveProductModal(false)
                }}
                deviceId={device.id!}/>
        </>
    )
}

export default AdminProductItemActions;