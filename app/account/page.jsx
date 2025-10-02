'use client'; 

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { fetchCountryByCodeJSON } from 'lib/api';
import FullPageLoader from 'components/FullPageLoader';


export default function Account() {
  const [userCountry, setUserCountry] = useState("")
  const user = useSelector((state) => state.currentUser.user);
  
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const countryCode = user?.country;
      if (countryCode) {
        const country = await fetchCountryByCodeJSON(countryCode);
        setUserCountry(`${countryCode} | ${country}`)
      }
    })();
  }, [user])
  
  const userDetails = [
    {key : "First Name", value : user?.firstName},
    {key : "Last Name", value : user?.lastName},
    {key : "Email", value : user?.email},
    {key : "Address", value : user?.address},
    {key : "Country", value : userCountry},
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <FullPageLoader />;
  }


  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  function enableEdit() {

  }

  return (<>
    <h1 className="mb-10">Account</h1>
    {userDetails.map((item) => (
      <div key={item.key} className="w-full flex max-md:flex-col justify-center items-center my-4 md:gap-5">
        <h5>{item.key}:</h5>
        <p>{item.value || "*Please update"}</p>
      </div>
    ))}
    <div className="flex gap-5 mt-10">
      <button 
        className="btn p-4 rounded-full bg-gray-600"
        onClick={enableEdit}
      >
        <Image 
          src="/icons/settings.svg"
          alt="Setting Icon"
          width={50}
          height={50}
        />
      </button>
      <button 
        className="btn-lg"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  </>);
}