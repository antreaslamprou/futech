'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { addUser } from 'lib/api'
import { signUpValidations } from '@/utils/validationSchemas';
import toast from 'react-hot-toast';
import CustomInputField from './CustomInputField'
import CustomSelectField from './CustomSelectField'
import FormButton from './FormButton';


function SignUpForm() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const router = useRouter();

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

        for (const validation of signUpValidations) {
            if (!validation.valid(userData)) {
                toast.error(validation.error);
                return;
            }
        }

        setIsLoading(true);
        const res = await addUser(userData);
        
        if (res.ok) {
            toast.success("Account created!");
            router.push("/login");
        } else {
            const data = await res.json();
            toast.error(data.error || "Error creating account");
            setIsLoading(false);
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
                showPasswordRequirements={true}
                tooglePasswordRequirements={isPasswordFocused}
            />
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
        <FormButton
            type="submit"
            isLoading={isLoading}
            className="form-btn"
        >
            Sign Up
        </FormButton>
        
    </form>);
}

export default SignUpForm;