'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function ProviderRedirect() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");

  useEffect(() => {
    if (provider) {
      signIn(provider, { callbackUrl: "/auth/popup-complete" });
    }
  }, [provider]);

  return <p>Redirecting to {provider}...</p>;
}