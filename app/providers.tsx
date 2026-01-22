"use client";

import { type ReactNode, useEffect } from "react";
// Import the React patch to ensure it runs on the client side
import "@/lib/react-patch";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // This is just to ensure the component mounts and the patch is applied
  }, []);

  return <>{children}</>;
}
