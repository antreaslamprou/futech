'use client';

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "store/features/currentUserReducer";
import { getUser } from "lib/api";
import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'store/providers/ReduxProvider';


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


export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <SessionSync>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </SessionSync>
      </SessionProvider>
    </ReduxProvider>
  );
}