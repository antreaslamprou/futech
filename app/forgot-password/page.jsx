"use client";

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomInputField from 'components/CustomInputField';
import FullPageLoader from 'components/FullPageLoader';
import { fetchUserByEmail } from '@/lib/api';
import toast from 'react-hot-toast';


export default function ForgotPassword() {
    const user = useSelector((state) => state.currentUser.user);
    const router = useRouter();

    const [email, setEmail] = useState("");
    
    useEffect(() => {
        if (user) {
          router.replace('/account');
        }
    }, [user, router]);

    async function handleResetLink() {
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return toast.error("Please enter a valid email");
        try {
            const user = await fetchUserByEmail(email);
            if (user) {
                toast.success("Reset link send to your email");
            }
        } catch {
            toast.error("No user found with this email");
        }
    }

    if (user) {
        return <FullPageLoader />;
    }

    return (<>
        <h1 className="mb-10 md:mb-20">Forgot Your Password</h1>
        <p>Please enter your email:</p>
        <div className="form-control">
            <CustomInputField 
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-10 md:mt-20 flex gap-10">
            <Link 
                href='/login'
                className='text-xl text-center btn-lg bg-red-900' 
            >
                Go Back
            </Link>
            <button 
                href='/'
                className='text-xl text-center btn-lg' 
                onClick={() => handleResetLink()}
            >
                Send Reset Link
            </button>
        </div>
    </>);
}