'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import CustomInputField from './CustomInputField'


function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (firstName.length < 3 ) {
            toast.error("Please enter a valid first name");
            return;
        }

        if (lastName.length < 3 ) {
            toast.error("Please enter a valid last name");
            return;
        }

        if (lastName.length < 3 ) {
            toast.error("Please enter a valid last name");
            return;
        }

        if (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!password || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password))) {
            toast.error("Please enter a valid password");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (country === "") {
            toast.error("Please select your country");
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password, address, country }),
        });

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
                onChange={(e) => setFirstName(e.target.value)}
            />
            <CustomInputField 
                id="lastName" 
                type="text" 
                value={lastName} 
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
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
            <CustomInputField 
                id="country" 
                type="select" 
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