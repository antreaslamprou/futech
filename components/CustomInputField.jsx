'use client';

import { useState, useRef } from 'react';
import { passwordRequirements } from '@/utils/passwordValidation';
import Image from 'next/image';


export default function InputField({ id, label, type = "text", value, className, onChange, onFocus, onBlur, required = false, showPasswordRequirements = false, tooglePasswordRequirements = true }) {
    // For password
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const getUnmetRequirements = () => {
        return passwordRequirements.filter(req => !req.validator(value));
    };

    return (<>
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
        {showPasswordRequirements && (
            <div className={`
                text-sm px-4 transition-['translate, opacity, height'] duration-300 overflow-hidden
                ${tooglePasswordRequirements && getUnmetRequirements().length > 0 ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
            >   
                <p className="mt-4">Password must have:</p>
                <ul className="list-disc list-inside text-gray-600">
                    {getUnmetRequirements().map((requirement) => (
                        <li key={requirement.id}>
                            {requirement.label}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>)
}
