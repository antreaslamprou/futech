'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { addUser } from 'lib/api'
import toast from 'react-hot-toast';
import CustomInputField from './CustomInputField'
import CustomSelectField from './CustomSelectField'


function SignUpForm() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const router = useRouter();

    const validations = [
        {
            valid: (v) => v.firstName.trim().length >= 3,
            error: "Please enter a valid first name",
        },
        {
            valid: (v) => v.lastName.trim().length >= 3,
            error: "Please enter a valid last name",
        },
        {
            valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email),
            error: "Please enter a valid email",
        },
        {
            valid: (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v.password),
            error: "Please enter a valid password",
        },
        {
            valid: (v) => v.password === v.confirmPassword,
            error: "Passwords do not match",
        },
        {
            valid: (v) => v.address.trim().length >= 3,
            error: "Please enter a valid address",
        },
        {
            valid: (v) => v.country !== "",
            error: "Please select your country",
        },
    ];

    function validateForm(values) {
        for (const rule of validations) {
            if (!rule.valid(values)) {
            return rule.error; // Return the first error
            }
        }
        return null; // All validations passed
    }


    async function handleSubmit(e) {
        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            address,
            country,
        };

        const error = validateForm(userData);

        if (error) {
            toast.error(error);
            return;
        }

        const res = await addUser(userData);
        
        if (res.ok) {
            toast.success("Account created!");
            router.push("/login");
        } else {
            const data = await res.json();
            toast.error(data.error || "Error creating account");
        }

    }

    return (
    <form className='flex flex-col' onSubmit={handleSubmit} autoComplete="off">
        <div className="form-control form-control-2">
            <CustomInputField 
                id="firsName" 
                type="text" 
                value={firstName} 
                label="First Name"
                onChange={(e) => setfirstName(e.target.value)}
            />
            <CustomInputField 
                id="lastName" 
                type="text" 
                value={lastName} 
                label="Last Name"
                onChange={(e) => setlastName(e.target.value)}
            />
        </div>
        <div className="form-control">
            <CustomInputField 
                id="email" 
                type="email" 
                value={email} 
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInputField
                id="password" 
                type="password" 
                value={password}
                label="Password" 
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
            />
            <div className={`
                    text-sm px-4 transition-['translate, opacity'] duration-300 overflow-hidden
                    ${isPasswordFocused ? 'opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                >
                <p className="mt-4">Password must have:</p>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one digit</li>
                    <li>At least one special character</li>
                </ul>
            </div>
            <CustomInputField 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword}
                label="Confirm Password" 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={!isPasswordFocused && '-mt-3'}
            />
        </div>
        <div className="form-control">
            <CustomInputField 
                id="address" 
                type="text" 
                value={address} 
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
            />
            <CustomSelectField 
                id="country" 
                value={country} 
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
            />
        </div>
        <button className="btn-lg mt-10 mx-auto">
            Sign Up
        </button>
        
    </form>);
}

export default SignUpForm;