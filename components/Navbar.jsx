'use client';

import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const user = useSelector((state) => state.currentUser.user);
    const basket = useSelector((state) => state.basket.basket);
    const navItems = [
        { path: "/", name: "Home" },
        { path: "/products", name: "Shop" },
        { path: "/about", name: "About" },
        user
        ? { path: "/account", name: "Account" }
        : { path: "/login", name: "Log In" },
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [isClickable, setIsClickable] = useState(false);
    const pathname  = usePathname();

    const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            const timeout = setTimeout(() => {
                setIsClickable(!isOpen);
            }, 200);

            return () => clearTimeout(timeout);
        } else {
            setIsClickable(!isOpen);
        }
    };

    useEffect(() => {
        if (isOpen) toggleMenu();
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

 
    return(
        <nav className="flex justify-between align-middle sticky top-0 z-10 bg-futech-black">
            <Link href="/" className="my-auto z-15 non-hover">
                <h3>FUTECH.</h3>
            </Link>

            <div className="z-20 flex gap-6">
                { basket.length > 0 && (
                    <Link href="/checkout" className="animate-scaleInOut">
                        <div className="relative">
                            <Image 
                                src="/icons/basket.svg" 
                                alt="Basket" 
                                width={40}
                                height={40}
                                className="w-8 h-8 md:w-10 md:h-10" 
                            />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full pt-1 ps-0.5 text-[10px] w-5 h-5 flex items-center justify-center">{totalItems}</span>
                        </div>
                    </Link>
                )}
                <button 
                    className="block cursor-pointer group max-md:mt-3"
                    onClick={toggleMenu}
                >
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`scale-75 md:scale-100 w-8 h-0.75 my-1.5 md:my-2 bg-white rounded-full transition-['rotate,translate'] duration-300 ${index === 1 && 'group-hover:translate-x-2'} ${
                                isOpen ? 
                                    index === 0 ? 'rotate-45 translate-y-2 md:translate-y-2.5' :
                                    index === 1 ? 'opacity-0' :
                                    '-rotate-45 -translate-y-2.5  md:-translate-y-3' 
                                : ''
                            }`}
                        />
                    ))}
                </button>
            </div>
            
            
            <div className={`nav-links py-25 px-15 md:px-20 lg:px-25 absolute h-screen w-screen start-0 top-0 z-10 bg-black transition-opacity duration-250 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 xl:gap-20 overflow-hidden
            ${ isOpen ? 'visible opacity-100' : 'hide opacity-0'} ${!isClickable && 'scale-0'}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`nav-item h-full mx-0 flex items-center justify-center uppercase tracking-wider ${pathname === item.path && "active"}`}
                            >
                                {item.name}
                        </Link>
                    ))}
            </div>
        </nav>
    )
}