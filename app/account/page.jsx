'use client'; 

import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import FullPageLoader from 'components/FullPageLoader';


export default function Account() {
  const user = useSelector((state) => state.currentUser.user);
  console.log("Redux user:", user);

  const { data: session } = useSession();
  console.log(session?.user); 

  const { status } = useSession();
  const router = useRouter();

  const userDetails = [
    {key : "First Name", value : user?.firstName},
    {key : "Last Name", value : user?.lastName},
    {key : "Email", value : user?.email},
    {key : "Address", value : user?.address},
    {key : "Country", value : user?.country},
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

  return (<>
    <h1 className="mb-10">Account</h1>
    {userDetails.map((item) => (
      <div key={item.key} className="w-full flex max-md:flex-col justify-center items-center md:gap-5">
        <h5>{item.key}:</h5>
        <p>{item.value}</p>
      </div>
    ))}
    <button 
      className="btn-lg mt-20 mx-auto"
      onClick={logout}
    >
      Log Out
    </button>
  </>);
}