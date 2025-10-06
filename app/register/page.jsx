'use client';

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SignUpForm from 'components/SignUpForm';
import FullPageLoader from 'components/FullPageLoader';


export default function Register() {
    const user = useSelector((state) => state.currentUser.user);
    const router = useRouter();

    useEffect(() => {
        if (user) {
          router.replace('/account');
        }
    }, [user, router]);

    if (user) {
        return <FullPageLoader />;
    }

    return (<>
        <h1>Sign Up</h1>
        <SignUpForm />
        <Link 
            href='/login'
            className='mt-10 md:mt-15 text-xl text-center' 
        >
            Already a Member?<br/>Swap to Log In!
        </Link>
    </>);
}