import React, {PropsWithChildren, useContext, useState} from 'react';
import OrderModal from "../../modals/OrderModal";
import {adminRemoveOrder} from "../../../http/orderAPI";
import {OrderI} from "../../../store/OrderStore";
import {UserI} from "../../../store/UserStore";
import {AdminOrderContext} from "../../../views/Admin/AdminOrders";
import {Context} from "../../../index";

interface AdminOrderActionsProps extends PropsWithChildren {
    order: OrderI,
}
const AdminOrderActions:React.FC<AdminOrderActionsProps> = ({order}) => {
    const {user} = useContext(Context)
    const [isEditOrderVisible, setEditOrderVisible] = useState(false)
    const {isRender, setIsRender} = useContext(AdminOrderContext);
    const forceParentRender = () => setIsRender(!isRender);


    return (
        <>
            <button
                className="btn btn-success me-2"
                onClick={() => setEditOrderVisible(true)
                }
            >Edit
            </button>
                        <OrderModal
                            mode="edit"
                            show={isEditOrderVisible}
                            order={order}
                            onHide={() => {
                                setEditOrderVisible(false)
                            }
                            }/>
            <button className="btn btn-danger" onClick={() => {
                adminRemoveOrder(user.id!, order.id!).then(result => {
                    if (result.result === true) {
                        forceParentRender()
                    }
                })
            }
            }>Delete
            </button>
        </>
    )
}

export default AdminOrderActions;