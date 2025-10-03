'use client'; 

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import AccountTabs from '@/components/AccountTabs';
import FullPageLoader from '@/components/FullPageLoader';

export default function AccountPage() {
  const user = useSelector((state) => state.currentUser.user);
  const router = useRouter();

  if (user === null) {
    return <FullPageLoader />;
  } else if (!user) {
    router.replace('/login');
    return null;
  }

  return (<>
    <h1>Account</h1>
    <AccountTabs />
  </>);
}