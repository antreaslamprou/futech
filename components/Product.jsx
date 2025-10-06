'use client';

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { addItem, changeQuantity } from 'store/features/basketReducer';
import { formatStringToDashCase } from '@/utils/formatters'
import Link from "next/link";
import Image from 'next/image';
import toast from "react-hot-toast";


export default function Product({product, position, button, showPrice}) {
    var textAlign = "md:text-start mb-0";
    var buttonAlign = "md:justify-start";
    var imageOrder = "md:order-0";
    var imageAnimation = "md:animate-slideIn-left";
    var textAnimation = "md:animate-slideIn-right";

    if (position === "right") {
        textAlign = "md:text-end  mb-0";
        buttonAlign = "md:justify-end";
        imageOrder = "md:order-2";
        imageAnimation = "md:animate-slideIn-right";
        textAnimation = "md:animate-slideIn-left";
    }

    const [isAdded, setIsAdded] = useState(false);
    const basket = useSelector((state) => state.basket.basket);

    const dispatch = useDispatch();

    function addToCart() {
        dispatch(addItem(product));
        toast.success(`${product.name} added to cart!`);
        setIsAdded(true);
    }

    function addQuantity() {
        dispatch(addItem(product));
    }

    function deductQuantity() {
        const currentProduct = basket.find(item => item.id === product.id);
        if (currentProduct.quantity === 1) setIsAdded(false);
        dispatch(changeQuantity(currentProduct));
    }

    useEffect(() => {
        const found = basket.find(item => item.id === product.id);
        if (found && found.quantity) setIsAdded(true);
    }, []);

    return (
    <div className="product overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Image 
                src={`/images/${formatStringToDashCase(product.name)}.webp`} 
                alt={product.name} 
                width={500}
                height={500}
                className={`${imageOrder} mx-auto animate-fadeIn ${imageAnimation}`} 
                priority
            />
            <div className={`order-1 animate-fadeIn ${textAnimation}`}>
                <h1 className={textAlign}>{product.name}</h1>
                <h5 className={`text-center mt-1 ${textAlign}`}>{product.title}</h5>
                <p className={`text-center mt-7 ${textAlign}`}>{product.description}</p>
                {showPrice !== false && (
                    <p className={`text-center mt-7 font-bold text-3xl ${textAlign}`}>${product.price}</p>
                )}
                {button === 'LearnMore' ? (
                    <div className={`Link mt-10 flex justify-center ${buttonAlign}`}>
                        <Link href={`/products/${product.id}`} className="btn">Learn More</Link>
                    </div>
                ) : button === 'Buy' ? (
                    <>
                        <div className={`Link mt-8 flex justify-center relative ${buttonAlign}`}>
                            <button className={`btn transition-opacity duration-300 ${isAdded ? "opacity-0" : ""}`} onClick={addToCart}>Buy Now</button>
                        
                            { isAdded &&
                                <div className="flex gap-5 items-center justify-center absolute mt-2">
                                    <button 
                                        className="w-10 h-10 text-2xl rounded-full border-1 ps-1"
                                        onClick={() => deductQuantity()}
                                    >
                                        -
                                    </button>
                                    <p className="text-2xl">x {basket.find(item => item.id === product.id).quantity || 0}</p>
                                    <button 
                                        className="w-10 h-10 text-2xl rounded-full border-1 ps-1"
                                        onClick={() => addQuantity()}
                                    >
                                        +
                                    </button>
                                </div>
                            }
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    </div>);
}