import { formatDate, formatTime } from "@/utils/formatters";
import FullPageLoader from "./FullPageLoader";
import OrderItem from "./OrderItem"
import { useState } from "react";


export default function OrdersTab({ orders }) {
    if (orders === null) return <FullPageLoader />
    
    const [orderItemsClass, setOrderItemsClass] = useState("max-h-0");

    function handleOrderItem() {
        setOrderItemsClass("");
    }

    return (
        <div className="account-content">
            <div className="space-y-4">
                {orders.length ? (
                    orders.map((order) => (   
                        <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                            <p>Order #{order.id}</p>
                            <p>Total: ${order.total}</p>
                            <p>Date: {formatDate(order.order_date)}</p>
                            <p>Time: {formatTime(order.order_date)}</p>
                            <button 
                                onClick={handleOrderItem}
                                className="mt-2 text-sm text-blue-400"
                            >
                                View Details
                            </button>
                            <OrderItem 
                                order={order} 
                                classList={orderItemsClass}
                            />
                        </div>
                    ))
                ) : (
                    <h4>No orders yet</h4>
                )}
            </div>
        </div>
    );
}
