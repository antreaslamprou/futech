"use client";

import { resetPassword } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FormButton from '@/components/FormButton';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react'
import { validateToken } from "@/lib/api";
import FullPageLoader from 'components/FullPageLoader';
import CustomInputField from 'components/CustomInputField';
import { passwordResetValidations } from '@/utils/validationSchemas'


export default function ResetPassword() {
    const searchParams  = useSearchParams();
    const token = searchParams.get('token');

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    useEffect(() => {
        ( async () => {
            try{
                const data = await validateToken(token);
                setUserId(data.userId);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsPageLoading(false);
            }
        })();
    }, []);

    async function handleResetLink() {
        const formData = { password, confirmPassword };
        for (const validation of passwordResetValidations) {
            if (!validation.valid(formData)) {
                toast.error(validation.error);
                return;
            }
        }
        
        try {
            setLoading(true);
            await resetPassword(token, userId, password);
            toast.success("Pasword Changed!");
        } catch (e) {
            console.log(e);
            toast.success("Error resetting password");
            setLoading(false);
        }
    }

    if (isPageLoading) {
        return <FullPageLoader />;
    }

    return (<>
        <h1>Reset Your Password</h1>
        { !userId ? (
            <>
                <h3 className="mb-5">Error Validating Token: {error}.</h3>
                <p>In order to get a new token and reset your password, go to the Login ➔ Forgot Password. A new email will be send with the reset password url.</p>
                <Link 
                    href='/'
                    className='btn-lg form-btn' 
                >
                    Home
                </Link>
            </>
        ) : (
            <>
                <p>Please enter your new Password:</p>
                <div className="form-control">
                    <CustomInputField 
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPasswordRequirements={true}
                    />
                    <CustomInputField 
                        id="confirm-password"
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="mt-10 md:mt-20 flex gap-5 md:gap-10">
                    <Link 
                        href='/'
                        className='text-center btn-lg bg-red-900' 
                    >
                        Go Back
                    </Link>
                    <FormButton 
                        isLoading={isLoading}
                        onClick={() => handleResetLink()}
                    >
                        Save Password
                    </FormButton>
                </div>
            </>
        )}
    </>);
}