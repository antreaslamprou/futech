'use client';

import { useSelector } from 'react-redux'
import Product from 'components/Product';

export default function Products() {
    const products = useSelector((state) => state.products.products);

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