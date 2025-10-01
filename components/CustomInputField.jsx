'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import CountriesList from 'data/countries.json'


export default function InputField({ id, label, type = "text", value, className, onChange, onFocus, onBlur, required = false,  }) {
    // For password
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    // For country
    const [selectedValue, setSelectedValue] = useState('');
    function handleChange(e) {
        const currentValue = e.target.value;
        setSelectedValue(currentValue);
        onChange(e); 
        console.log(currentValue);
    };

    return (
        <div className={`relative w-full ${className}`}>
            { inputType === 'select' ? (
                <>
                    <select 
                        id={id}
                        onChange={handleChange} 
                        value={selectedValue} 
                        className={selectedValue === "" ? "text-gray-400" : "peer"}
                    >
                        <option value="" className="text-gray-400"></option>
                        {CountriesList.map((item) => (
                            <option
                                key={item.code}
                                value={item.code}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor={id}
                        className={selectedValue === '' ? 'top-5' : ''}
                    >
                        {label}
                    </label>
                </>
            ) : (
                <>
                    <input 
                        ref={inputRef}
                        id={id}
                        type={inputType}
                        value={value} 
                        placeholder=" "
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        name="email"
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
                            className="absolute right-5 top-6"
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
                </>
            )}
        </div>
    )
}
