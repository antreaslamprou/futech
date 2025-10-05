'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';


export default function InputField({ id, label, type = "text", value, className, onChange, onFocus, onBlur, required = false,  }) {
    // For password
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className={`relative w-full ${className}`}>        
            <input 
                ref={inputRef}
                id={id}
                type={inputType}
                value={value} 
                placeholder=" "
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                name={id}
                className="peer"
                required={required}
            />
            <label
                htmlFor={id}
            >
                {label}
            </label>
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-6 non-hover"
                    tabIndex="-1"
                >
                    <Image
                        width={24}
                        height={24}
                        alt="Show/Hide Password"
                        src={ showPassword ? "/icons/eye.svg" : "/icons/eye-off.svg" }
                    />
                </button>
            )}
        </div>
    )
}
