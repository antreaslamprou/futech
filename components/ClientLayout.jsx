'use client';

import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from 'store/features/currentUserReducer';
import { addProducts } from 'store/features/productsReducer';
import { addCountries } from 'store/features/countriesReducer';
import { getUser, fetchProductsJSON, fetchCountriesJSON } from '@/lib/api';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'store/providers/ReduxProvider';
import FullPageLoader from './FullPageLoader';


// Save user data to redux from session email
function SessionSync({ children }) {
  const { status } = useSession();
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
  }, [status, dispatch]);

  return children;
}

// Save products and countries to redux
function GetData({children}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Products
      const products = await fetchProductsJSON();
      dispatch(addProducts(products));
      // Countries
      const countries = await fetchCountriesJSON();
      dispatch(addCountries(countries));
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
          <GetData>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </GetData>
        </SessionSync>        
      </SessionProvider>
    </ReduxProvider>
  );
}