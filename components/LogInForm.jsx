'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginValidations } from '@/utils/validationSchemas';
import Link from 'next/link';
import toast from 'react-hot-toast';
import CustomInputField from './CustomInputField'
import AuthButtons from "./AuthButtons";
import FormButton from './FormButton';


function LogInForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = { email, password };
        for (const validation of loginValidations) {
            if (!validation.valid(formData)) {
                toast.error(validation.error);
                return;
            }
        }

        setIsLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res.ok) {
            router.push("/account");
        } else {
            toast.error("Invalid email or password");
            setIsLoading(false);
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
                <Link
                    href="/forgot-password"
                    className="ps-2.5 mt-0"
                    >
                    Forgot your Password?
                </Link>
            </div>

            <FormButton 
                type="submit"
                isLoading={isLoading}
                className="form-btn"
            >
                Log In
            </FormButton>
        </form>
        <AuthButtons />
    </>);
}

export default LogInForm;