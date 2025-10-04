'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import BasketItem from '@/components/BasketItem';
import FullPageLoader from './FullPageLoader';

export default function OrderItems({ orderItems }){
    const products = useSelector((state) => state.products.products);

    const enrichedOrderItems = useMemo(() => {
        return orderItems.map(orderItem => {
            const fullProduct = products.find(product => 
                product.id === orderItem.productId
            );
            return fullProduct ? { ...orderItem, ...fullProduct } : orderItem;
        });
    }, [orderItems, products]);

    if (!enrichedOrderItems.length) return <FullPageLoader />;;

    return enrichedOrderItems.map((item) => (
        <BasketItem key={item.order_item_id || item.id} product={item} />
    ));
}