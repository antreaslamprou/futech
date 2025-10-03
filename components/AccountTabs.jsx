'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchOrders } from '@/lib/api';
import ProfileTab from './ProfileTab';
import OrdersTab from './OrdersTab';
import SettingsTab from './SettingsTab';

export default function AccountTabs() {
    const [activeTab, setActiveTab] = useState('profile');
  
    const tabs = [
        { key: 'profile', label: 'Profile Info' },
        { key: 'orders', label: 'Order History' },
        { key: 'settings', label: 'Settings' },
    ];

    // For Orders tab
    const user = useSelector((state) => state.currentUser.user);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        (async () => {
            const ordersData = await fetchOrders(user.id);
            setOrders(ordersData);
        })();
    },[])

    return (
        <div className="flex flex-col w-full h-full mx-auto mt-10">
            {/* Tab Header */}
            <div className="flex justify-center">
                {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                    px-4 py-2 font-medium text-xl md:text-2xl non-hover',
                    ${activeTab === tab.key
                        ? "border-b-2 "
                        : "text-gray-400 hover:text-white"
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            <hr className="h-1 mb-6 -mt-3 text-gray-700" />

            {/* Tab Content */}
            <div className="flex h-full w-full items-center justify-center">
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'orders' && <OrdersTab orders={orders} />}
                {activeTab === 'settings' && <SettingsTab />}
            </div>
        </div>
    );
}
