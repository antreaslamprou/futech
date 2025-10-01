'use client';

import { useState, useEffect } from "react";
import { fetchProducts } from 'lib/api';
import Product from "components/Product";
import FullPageLoader from "@/components/FullPageLoader";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(setProducts).catch(console.error).finally(setLoading(false));
    },[])

    if (loading) return <FullPageLoader />

    return (
    <div className="products-grid">
        {products.map((product, index) => (
            <Product 
                key={product.name} 
                product={product} 
                position={index % 2 == 1 ? "right" : "left"} 
                button={"LearnMore"}
                showPrice={false}
            />
       ))}
    </div>);
}