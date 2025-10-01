'use client';

import Product from "components/Product";
import products from "data/products.json";


export default function Products() {
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