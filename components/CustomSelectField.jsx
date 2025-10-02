'use client';

import { useState, useEffect } from 'react';
import { fetchCountriesJSON } from 'lib/api';


export default function InputField({ id, label, value, className, onChange, onFocus, onBlur, required = false,  }) {
    // For country
    const [selectedValue, setSelectedValue] = useState('');
    const [countries, setCountries] = useState([]);
    function handleChange(e) {
        const currentValue = e.target.value;
        setSelectedValue(currentValue);
        onChange(e); 
    };

    useEffect(() => {
        async function getCountries() {
            const countries = await fetchCountriesJSON();
            setCountries(countries);
        }
        getCountries();
    }, []);

    return (
        <div className={`relative w-full ${className}`}>
            <select 
                id={id}
                onChange={handleChange} 
                value={selectedValue} 
                className={selectedValue === "" ? "text-gray-400" : "peer"}
            >
                <option value="" className="text-gray-400"></option>
                {countries.map((item) => (
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
        
        </div>
    )
}
