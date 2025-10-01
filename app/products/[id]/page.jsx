'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react'
import { fetchProductById } from 'lib/api'
import Product from 'components/Product';
import FullPageLoader from '@/components/FullPageLoader';



export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        async function loadProduct() {
            try {
                const fetchedProduct = await fetchProductById(id);
                if (!fetchedProduct) {
                    notFound(); 
                } else {
                    setProduct(fetchedProduct);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        }

        if (id) loadProduct();

    },[id])

    if (loading) {
        return <FullPageLoader />
    }

    if (!product) {
        notFound();
    }

    return (<div className=''>
        <Product product={product} button={"Buy"} />
    </div>);
}