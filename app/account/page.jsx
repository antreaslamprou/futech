'use client'; 

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from 'store/features/currentUserReducer';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut, update } from 'next-auth/react';
import { fetchCountryByCodeJSON, updateUser } from 'lib/api';
import Image from 'next/image';
import FullPageLoader from 'components/FullPageLoader';
import toast from 'react-hot-toast';


export default function Account() {
  const [userCountry, setUserCountry] = useState("")
  const user = useSelector((state) => state.currentUser.user);
  const [isEditing, setIsEditing] = useState(false);
  const [areDataChanged, setAreDataChanged] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
    country: user?.country || ""
  });
  
  const { status } = useSession();
  const dispatch = useDispatch();
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
    {key : "firstName", label : "First Name", value : user?.firstName},
    {key : "lastName", label : "Last Name", value : user?.lastName},
    {key : "email", label : "Email", value : user?.email},
    {key : "address", label : "Address", value : user?.address},
    {key : "country", label : "Country", value : userCountry},
  ]

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        country: user.country || ""
      });
    }
  }, [user]);


  if (status === 'loading' || status === 'unauthenticated') {
    return <FullPageLoader />;
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
    setAreDataChanged(false);
  }

  async function saveEdit() {
    try {
      const data  = await updateUser(user.email, formData)
      if (data.success) {
        dispatch(setUser(formData)); 
        await update(formData);
        toast.success("User updated!");
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error during update");
    } finally {
      setIsEditing(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
  
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const hasChanges = Object.keys(updatedFormData).some((key) => {
      return updatedFormData[key] !== (user?.[key] || "");
    });

    setAreDataChanged(hasChanges);
  }

  return (<>
    <h1 className="mb-10">Account</h1>
    {userDetails.map((item) => (
      <div key={item.key} className="w-full flex max-md:flex-col justify-center items-center my-4 md:gap-5">
        <h5>{item.label}:</h5>
        {isEditing ? (
          <input
            name={item.key}
            value={formData[item.key] || ""}
            onChange={handleChange}
            placeholder="Please fill"
            className="md:max-w-1/2"
          />
        ) : (
          <p className={(item.value) ? "" : "text-red-500"}>{item.value || "*Please update"}</p>
        )}
      </div>
    ))}
    <div className="flex gap-5 mt-10">
      {isEditing ? (
        <>
          <button 
          className="btn-lg bg-red-500"
          onClick={toggleEdit}
          >
            Cancel
          </button>
          <button 
            className="btn-lg bg-green-500"
            onClick={saveEdit}
            disabled={!areDataChanged}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button 
          className="btn p-4 rounded-full bg-gray-600"
          onClick={toggleEdit}
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
        </>
      )}
      
    </div>
  </>);
}