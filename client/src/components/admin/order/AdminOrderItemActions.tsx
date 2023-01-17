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
    setBasketDevices: (value: BasketDeviceI[] | ((prevVar: BasketDeviceI[]) => BasketDeviceI[])) => void;
}

const AdminOrderItemActions: React.FC<AdminOrderActionsProps> = ({order, basketDevices, setBasketDevices}) => {
    const {user} = useContext(Context)
    const [isEditOrderVisible, setEditOrderVisible] = useState(false)
    const [isAddDeviceVisible, setIsAddDeviceVisible] = useState(false)
    const [isConfirmRemoveOrderModal, setisConfirmRemoveOrderModal] = useState(false)


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
                onHide={() => {
                    setEditOrderVisible(false)
                }
                }/>
            <button className="btn btn-danger" onClick={() => {
                setisConfirmRemoveOrderModal(true)
            }
            }>Delete order
            </button>
            <ConfirmRemoveOrderModal
                show={isConfirmRemoveOrderModal}
                adminRemoveOrder={adminRemoveOrder}
                userId={user.id!}
                orderId={order.id}
                onHide={() => {
                setisConfirmRemoveOrderModal(false)
            }
                    /*
                        adminRemoveOrder(user.id!, order.id!).then(result => {
                            if (result.result === true) {
                                forceParentRender()
                            }
                        })
                         */
            }/>
        </>
    )
}

export default AdminOrderItemActions;