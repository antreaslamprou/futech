'use client';

import Image from 'next/image';
import Link from 'next/link';   

export default function PageNotFound() {
    return (<>
        <Image 
            className="size-20 md:size-30 lg:size-40 mx-auto mb-5" 
            src="/images/error.gif"
            width={160}
            height={160}
            alt="Error Icon"
            unoptimized
        />
        <h1 className="text-center">Page Not Found</h1>
        
        <p className='text-center'>We couldn't find the page you were looking for. <br className="hidden md:block"/>The page either does not exist or it has been removed.</p>
        <p className="my-5 flex justify-center">
            <Link href="/" className="btn-lg">
                Go to Home
            </Link>
        </p>
    </>);    
}