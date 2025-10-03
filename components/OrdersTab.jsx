import { useState } from "react";
import { formatDate, formatTime } from "@/utils/formatters";
import Image from 'next/image'
import FullPageLoader from "./FullPageLoader";
import OrderItems from "./OrderItems"


export default function OrdersTab({ orders, orderItemsMap }) {
    if (orders === null) return <FullPageLoader />
    
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    function toogleOrderItems(orderId) {
        if (orderId === expandedOrderId) setExpandedOrderId(null);
        else setExpandedOrderId(orderId);
    }

    return (
        <div className="account-content">
            <div className="space-y-4">
                {orders.length ? (
                    orders.map((order) => (   
                        <div key={order.id} className="bg-gray-800 py-5 px-10 rounded-lg">
                            <div className="text-center md:text-start">
                                <p>Order #{order.id}</p>
                                <p>Total: ${order.total}</p>
                                <p>Date: {formatDate(order.order_date)}</p>
                                <p>Time: {formatTime(order.order_date)}</p>
                            </div>
                            <div className={`overflow-hidden transition-opacity duration-300 
                                ${expandedOrderId === order.id ? "opacity-100 p-5" : "max-h-0 opacity-0"}`}>
                                <OrderItems 
                                    orderItems={orderItemsMap[order.id] || []}
                                />
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <button 
                                    onClick={() => toogleOrderItems(order.id)}
                                    className="mt-2 text-sm text-blue-400 flex items-center"
                                >
                                    {expandedOrderId === order.id ? "Hide Details" : "View Details"}
                                    <Image 
                                        src="/icons/arrow.svg"
                                        alt="Arrow"
                                        width={24}
                                        height={24}
                                        className={`ms-1.5 filter-[invert(44%)_sepia(94%)_saturate(1503%)_hue-rotate(190deg)_brightness(97%)_contrast(101%)]
                                            ${expandedOrderId === order.id ? "rotate-180" : "pb-1"}`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4>No orders yet</h4>
                )}
            </div>
        </div>
    );
}