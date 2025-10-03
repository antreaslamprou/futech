'use client';

import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from 'store/features/currentUserReducer';
import { addProducts } from 'store/features/productsReducer';
import { getUser, fetchProductsJSON } from '@/lib/api';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'store/providers/ReduxProvider';
import FullPageLoader from './FullPageLoader';


function SessionSync({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (status === "authenticated") {
          const data = await getUser();
          if (data.success) {
            dispatch(setUser(data.user));
          } else {
            dispatch(clearUser());
          }
        } else if (status === "unauthenticated") {
          dispatch(clearUser());
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        dispatch(clearUser());
      }
    })();
  }, [session, status, dispatch]);

  return children;
}

function GetProducts({children}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const products = await fetchProductsJSON();
      dispatch(addProducts(products));
      setIsLoading(false);
    })();
  }, [dispatch]);

  if (isLoading) return <FullPageLoader />

  return children;
}


export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <SessionSync>
          <GetProducts>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </GetProducts>
        </SessionSync>        
      </SessionProvider>
    </ReduxProvider>
  );
}