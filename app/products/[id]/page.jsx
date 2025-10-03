'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Product from 'components/Product';


export default function ProductPage() {
    const products = useSelector((state) => state.products.products);
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const currentProduct = products.find((item) => item.id ===  Number(id))
        if (currentProduct) setProduct(currentProduct);
        else return notFound();
    },[])
    
    if (product === null) return;

    return (<Product product={product} button={"Buy"} />);
}