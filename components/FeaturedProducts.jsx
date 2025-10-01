'use client';

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import products from "data/products.json";

export default function FeaturedProducts(){
    const [currentProduct, setCurrentProduct] = useState(products[0]);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const sloganRef = useRef(null);

    useEffect(() => {
        handleAnimation();
    },[currentProduct]);


    function handleAnimation() {
        const refs = [
            {element: imageRef.current, animaton: "animate-fadeIn-scaleIn"},
            {element: titleRef.current, animaton: "animate-slideIn-right"},
            {element: sloganRef.current, animaton: "animate-slideIn-left"},
        ];
        refs.forEach(ref => {
            if (ref.element) {
                ref.element.classList.remove("hidden");
                ref.element.classList.remove(ref.animaton);
                void ref.element.offsetWidth;
                ref.element.classList.add(ref.animaton);
            }
        });
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center featured-products"
        >
            <Link href={`/products/${currentProduct.id}`} className="w-full h-full">
                <div className="text-center relative w-full h-full flex-1 flex flex-col justify-center overflow-hidden">
                    <Image 
                        ref={imageRef}
                        src={`/images/${currentProduct.name}.webp`} 
                        alt={currentProduct.name} 
                        fill
                        sizes="(max-width: 1120px) 100vw, 1120px"
                        className="object-contain object-center absolute hidden"
                        priority
                    />
                    <h2 
                        ref={titleRef}
                        className="text-4xl font-bold mb-2 z-1 text-shadow-lg text-shadow-futech-black hidden"
                    >
                        {currentProduct.name}
                    </h2>
                    <p 
                        ref={sloganRef}
                        className="text-xl opacity-80 z-1 text-shadow-lg text-shadow-futech-black hidden"
                    >
                        {currentProduct.slogan}
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
                            onClick={() => setCurrentProduct(product)}
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