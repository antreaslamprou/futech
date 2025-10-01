'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import toast from 'react-hot-toast';
import CustomInputField from './CustomInputField'
import AuthButtons from "./AuthButtons";


function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res.ok) {
            router.push("/account");
        } else {
            toast.error("Invalid email or password");
        }
    };


    return (<>
        <form className='flex flex-col' onSubmit={handleSubmit} autoComplete="off">    
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
                />
            </div>

            <button type="submit" className="btn-lg mt-10 mx-auto">
                Log In
            </button>
        </form>
        <AuthButtons />
    </>);
}

export default LogInForm;