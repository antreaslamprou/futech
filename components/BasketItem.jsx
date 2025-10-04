'use client';

import { formatStringToDashCase } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';


export default function BasketItem({product, add, deduct, remove}) {
    return(
    <div className="mb-7 px-10 py-5 border border-futech-white rounded-lg w-full flex flex-col md:flex-row items-center justify-between relative">
        <Link 
            className="flex flex-col md:flex-row items-center justify-between md:gap-5 lg:gap-20"
            href={`/products/${product.id}`}
        >
            <Image
                src={`/images/${formatStringToDashCase(product.name)}.webp`}
                alt={product.name}
                width={150}
                height={150}
                className="object-contain mr-5"
                priority
            />
            <h3 className="my-5">{product.name}</h3>
        </Link>
        <div className="flex gap-5 items-center justify-center">
            {deduct && 
                <button 
                    className="w-10 h-10 text-2xl rounded-full border-1 ps-1"
                    onClick={deduct}
                >
                    -
                </button>
            }
            <p className="text-2xl">x {product.quantity}</p>
            {add && 
                <button 
                    className="w-10 h-10 text-2xl rounded-full border-1 ps-1"
                    onClick={add}
                >
                    +
                </button>
            }
        </div>
        <p className="text-2xl my-5">${product.totalPrice || product.quantity * product.price }</p>
        { deduct && 
            <button 
                className="absolute top-0 right-0 -m-3.5 bg-red-500 rounded-full w-10 h-10 non-hover"
                onClick={remove}
            >
                <h2>X</h2>
            </button>
        }
    </div>
    )
}