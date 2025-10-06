'use client';

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LogInForm from 'components/LogInForm';
import FullPageLoader from 'components/FullPageLoader';


export default function LogIn() {
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
        <h1>Log In</h1>
        <LogInForm />
        <Link 
            href='/register'
            className='mt-10 md:mt-15 text-xl text-center' 
        >
            New Member?<br/>Swap to Sign Up!
        </Link>
    </>);
}