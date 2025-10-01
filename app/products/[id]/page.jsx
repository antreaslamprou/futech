'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Product from 'components/Product';
import products from 'data/products.json';


export default function ProductPage() {
    const params = useParams();
    const { id } = params;
    const product = products[id - 1];

    if (!product) {
        notFound();
    }

    return (<div className=''>
        <Product product={product} button={"Buy"} />
    </div>);
}