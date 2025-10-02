'use client';

import { useState, useEffect } from 'react';
import { fetchCountriesJSON } from 'lib/api';

export default function CustomSelectField({ id, name, label, value, className, onChange, placeholder}) {
    const [countries, setCountries] = useState([]);

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
                name={name}
                onChange={onChange}
                value={value}
                className={value === "" ? "text-gray-400" : "peer"}
            >
                <option value="" className="text-gray-400">{placeholder}</option>
                {countries.map((item) => (
                    <option key={item.code} value={item.code}>
                        {item.name}
                    </option>
                ))}
            </select>
            {label && (
                <label htmlFor={id} className={value === '' ? 'top-5' : ''}>
                    {label}
                </label>
            )}
        </div>
    );
}