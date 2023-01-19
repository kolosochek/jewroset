import React, {PropsWithChildren, useContext, useState} from 'react';
import OrderModal from "../../modals/OrderModal";
import {adminRemoveOrder} from "../../../http/orderAPI";
import {OrderI} from "../../../store/OrderStore";
import {Context} from "../../../index";
import {BasketDeviceI} from "../../../store/BasketStore";
import AddDeviceModal from "../../modals/AddDeviceModal";
import ConfirmRemoveOrderModal from "../../modals/ConfirmRemoveOrderModal";

interface AdminOrderActionsProps extends PropsWithChildren {
    order: OrderI,
    basketDevices: BasketDeviceI[],
    setBasketDevices: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void,
    isForceParentRender: boolean,
    setIsForceParentRender: (value: boolean | ((varPrev: boolean) => boolean)) => void,
}

const AdminOrderItemActions: React.FC<AdminOrderActionsProps> = ({order, basketDevices, setBasketDevices, isForceParentRender, setIsForceParentRender}) => {
    const {user} = useContext(Context)
    const [isEditOrderVisible, setEditOrderVisible] = useState(false)
    const [isAddDeviceVisible, setIsAddDeviceVisible] = useState(false)
    const [isConfirmRemoveOrderModal, setIsConfirmRemoveOrderModal] = useState(false)


    return (
        <>
            <button
                className="btn btn-primary me-2"
                onClick={() => setIsAddDeviceVisible(true)}
            >Add device
            </button>
            <AddDeviceModal
                show={isAddDeviceVisible}
                basketDevices={basketDevices}
                setBasketDevices={setBasketDevices}
                order={order}
                onHide={() => {
                    setIsAddDeviceVisible(false)
                }
                }/>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditOrderVisible(true)
                }
            >Edit order
            </button>
            <OrderModal
                mode="edit"
                show={isEditOrderVisible}
                order={order}
                basketDevices={basketDevices}
                isForceParentRender={isForceParentRender}
                setIsForceParentRender={setIsForceParentRender}
                onHide={() => {
                    setEditOrderVisible(false)
                }
                }/>
            <button className="btn btn-danger" onClick={() => {
                setIsConfirmRemoveOrderModal(true)
            }
            }>Delete order
            </button>
            <ConfirmRemoveOrderModal
                show={isConfirmRemoveOrderModal}
                adminRemoveOrder={adminRemoveOrder}
                userId={user.id!}
                orderId={order.id}
                isForceParentRender={isForceParentRender}
                setIsForceParentRender={setIsForceParentRender}
                onHide={() => {
                    setIsConfirmRemoveOrderModal(false)
                }
                }/>
        </>
    )
}

export default AdminOrderItemActions;