'use client';

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "store/features/currentUserReducer";
import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'store/providers/ReduxProvider';


function SessionSync({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Dispatching user to Redux:", session?.user);
      dispatch(setUser(session.user));
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
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
