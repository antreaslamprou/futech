'use client';

import { useEffect } from "react";

export default function PopupComplete() {
  useEffect(() => {
    window.close();
  }, []);

  return <p>Signing in...</p>;
}