import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCountryByCodeJSON } from '@/lib/api';
import { formatKey } from '@/utils/formatters';


export default function ProfileTab() {
    const user = useSelector((state) => state.currentUser.user);
    const [userCountry, setUserCountry] = useState("");

    const userDetails = Object.entries({
        firstName : user?.firstName,
        lastName : user?.lastName,
        email : user?.email,
        address : user?.address,
        country : userCountry,
    });

    useEffect(() => {
        (async () => {
            const countryCode = user?.country;
            if (countryCode) {
                const country = await fetchCountryByCodeJSON(countryCode);
                setUserCountry(`${countryCode} | ${country}`)
            }
        })();
    }, [user]);

    return (
        <div className="account-content">
            {userDetails.map(([key, value]) => (
                <div key={key} className="w-full flex justify-between items-center my-4 md:gap-5">
                    <h5 className="me-5">{formatKey(key)}:</h5>
                    <p className={(value) ? "break-all text-end" : "text-red-500"}>{value || "*Please update"}</p>
                </div> 
            ))}
        </div>
    );
}
