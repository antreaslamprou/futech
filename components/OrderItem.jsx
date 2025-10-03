'use client';

import { useEffect, useState } from 'react';
import { fetchOrderItems } from '@/lib/api'
import BasketItem from '@/components/BasketItem';
import FullPageLoader from './FullPageLoader';


export default function OrderItem({ order, orderItemsClass }){
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        if (!order?.id) return;

        (async () => {
            const orderData = await fetchOrderItems(order.id)
            setOrderItems(orderData);
            console.log(orderData);
        }
        )();
    },[order])

    return(
        <div className={`overflow-hidden ${orderItemsClass}`}>
            { !orderItems ? <FullPageLoader /> :
            orderItems.map((item, index) => (
                <BasketItem
                    key={index} 
                    product={item} 
                />
            ))}
        </div>
    );
}