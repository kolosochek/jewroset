import React, {PropsWithChildren, useState} from 'react';
import { UserI } from '../../../store/UserStore';
import ClientModal from "../../Modals/ClientModal";
import ConfirmRemoveClientModal from "../../Modals/ConfirmRemoveClientModal";



interface AdminClientItemActionsProps extends PropsWithChildren {
    user: UserI,
}

const AdminClientItemActions: React.FC<AdminClientItemActionsProps> = ({user}) => {
    const [isEditUserVisible, setEditUserVisible] = useState(false)
    const [isConfirmRemoveUserModal, setIsConfirmRemoveUserModal] = useState(false)

    return (
        <>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditUserVisible(true)
                }
            >Edit
            </button>
            <ClientModal user={user} mode="edit" show={isEditUserVisible} onHide={() => setEditUserVisible(false)}/>
            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveUserModal(true)
            }
            }>Delete
            </button>
            <ConfirmRemoveClientModal
                show={isConfirmRemoveUserModal}
                onHide={() => {
                    setIsConfirmRemoveUserModal(false)
                }}
                userId={user.id!}/>
        </>
    )
}

export default AdminClientItemActions;