import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'next-auth/react';
import { setUser } from '@/store/features/currentUserReducer';
import { updateUser } from '@/lib/api';
import { formatKey } from '@/utils/formatters';
import toast from 'react-hot-toast';
import CustomSelectField from '@/components/CustomSelectField'


export default function SettingsTab() {
    const user = useSelector((state) => state.currentUser.user);
    const dispatch = useDispatch();

    const [areDataChanged, setAreDataChanged] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        address: user?.address || "",
        country: user?.country || ""
    });
  
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

    async function saveEdit() {
        try {
            const data  = await updateUser(user.email, formData)
            if (data.success) {
                dispatch(setUser(formData));
                toast.success("User updated!");
            } else {
                toast.error(data.error || "Update failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unexpected error during update");
        } finally {
            setAreDataChanged(false);
        }
    }

    function cancelEdit() {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            address: user?.address || "",
            country: user?.country || ""
        });

        setAreDataChanged(false);
    };

    function logout() {
        signOut({ callbackUrl: "/login" });
    }

    return (
        <div className="account-content">
            {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="w-full max-md:flex-col flex justify-between items-center md:gap-5 my-2">
                    <h5 className="md:w-45 max-md:text-start max-md:w-full ">{formatKey(key)}:</h5>
                    {key ===  "country" ? (
                        <CustomSelectField
                            name={key}
                            value={value}
                            onChange={(e) => {
                                setFormData({ ...formData, [key]: e.target.value });
                                handleChange(e);
                            }}
                            placeholder="Please select"
                            className=""
                            disabled={key === "email"}
                        />
                    ) : (
                        <input
                            name={key}
                            value={value || ""}
                            onChange={handleChange}
                            placeholder="Please fill"
                            className=""
                            disabled={key === "email"}
                        />
                    )}
                </div>
            ))}
            <div className="flex gap-5 md:gap-10 justify-center mt-5">
                <button 
                    className="btn-lg bg-red-500"
                    onClick={cancelEdit}
                    disabled={!areDataChanged}
                >
                    Cancel
                </button>
                <button 
                    className="btn-lg bg-green-600"
                    onClick={saveEdit}
                    disabled={!areDataChanged}
                >
                    Save
                </button>
            </div>
            <div className="flex justify-center mt-5">
                <button 
                    className="btn-lg"
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}
