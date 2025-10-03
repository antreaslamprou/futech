import { formatDate, formatTime } from "@/utils/formatters";
import FullPageLoader from "./FullPageLoader";

export default function OrdersTab({ orders }) {
    if (orders === null) return <FullPageLoader />

    return (
        <div className="account-content">
            <div className="space-y-4">
                {orders.length ? (
                    orders.map((order) => (   
                        <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                            <p>Order #{order.id}</p>
                            <p>Status: Shipped</p>
                            <p>Total: €748.00</p>
                            <p>Date: {formatDate(order.order_date)}</p>
                            <p>Time: {formatTime(order.order_date)}</p>
                            <button className="mt-2 text-sm text-blue-400 hover:underline">View Details</button>
                        </div>
                    ))
                ) : (
                    <h4>No orders yet</h4>
                )}
            </div>
        </div>
    );
}
