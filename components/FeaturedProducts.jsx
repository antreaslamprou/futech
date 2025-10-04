'use client';

import { useState, useRef } from "react";
import { useSelector } from 'react-redux'
import { formatStringToDashCase } from "@/utils/formatters";
import Image from 'next/image';
import Link from "next/link";


export default function FeaturedProducts(){
    const products = useSelector((state) => state.products.products);
    const [currentProduct, setCurrentProduct] = useState(products[0]);

    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const titleRef = useRef(null);
    
    function getRefs() {
        return [
            { element: imageRef.current, animaton: "animate-fadeIn-scaleIn" },
            { element: nameRef.current, animaton: "animate-slideIn-right" },
            { element: titleRef.current, animaton: "animate-slideIn-left" },
        ];
    }

    function handleAnimation() {
        const refs = getRefs();
        refs.forEach(ref => {
            if (ref.element) {
                ref.element.classList.remove("hidden");
                ref.element.classList.remove(ref.animaton);
                void ref.element.offsetWidth;
                ref.element.classList.add(ref.animaton);
            }
        });
    }

    function handleFilter(product) {
        const refs = getRefs();
        refs.forEach(ref => {
            if (ref.element) {
                ref.element.classList.add("hidden");
            }
        });
        setCurrentProduct(product);
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center featured-products"
        >
            <Link href={`/products/${currentProduct.id}`} className="w-full h-full non-hover">
                <div className="text-center relative w-full h-full flex-1 flex flex-col justify-center overflow-hidden">
                    <Image 
                        ref={imageRef}
                        src={`/images/${formatStringToDashCase(currentProduct.name)}.webp`} 
                        alt={currentProduct.name} 
                        fill
                        sizes="(max-width: 1120px) 100vw, 1120px"
                        className="object-contain object-center absolute hidden"
                        onLoad={handleAnimation}
                        priority
                    />
                    <h2 
                        ref={nameRef}
                        className="text-4xl font-bold mb-2 z-1 text-shadow-lg text-shadow-futech-black hidden"
                    >
                        {currentProduct.name}
                    </h2>
                    <p 
                        ref={titleRef}
                        className="text-xl opacity-80 z-1 text-shadow-lg text-shadow-futech-black hidden"
                    >
                        {currentProduct.title}
                    </p>
                </div>
            </Link>
            <div className="w-full overflow-hidden">
                <div 
                    className="my-8 flex justify-around sm:justify-center gap-4 animate-fadeIn overflow-x-auto scrollbar-hide px-4 py-2 opacity-0"
                    style={{animationDelay: "1.2s"}}
                >
                    <div className="bg-grey-400 h-2 w-20 z-2 absolute"></div>
                    {products.map((product) => (
                        <button
                            key={product.name}
                            onClick={() => handleFilter(product)}
                            className={`rounded-full px-4 z-3 ${
                                currentProduct.name === product.name
                                    ? "text-black btn-sm"
                                    : "text-white"
                            } transition`}
                        >
                            {product.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}