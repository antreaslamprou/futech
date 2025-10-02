'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react'
import { fetchProductByIdJSON } from 'lib/api'
import Product from 'components/Product';
import FullPageLoader from 'components/FullPageLoader';


export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        (async () => {
            const product = await fetchProductByIdJSON(id);
            if (!product) {
                notFound(); 
            } else {
                setProduct(product);
                setLoading(false);
            }
        })();
    },[id]);

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