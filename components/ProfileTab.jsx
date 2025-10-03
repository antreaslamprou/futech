import { useSelector } from 'react-redux';

import { formatKey } from '@/utils/formatters';


export default function ProfileTab({ country }) {
    const user = useSelector((state) => state.currentUser.user);

    const userDetails = Object.entries({
        firstName : user?.firstName,
        lastName : user?.lastName,
        email : user?.email,
        address : user?.address,
        country : country,
    });

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
