"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ACCESS_TOKEN_EVENT, getAccessToken } from "@/util/Auth/token";

const LOGIN_PATH = "/login";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(pathname === LOGIN_PATH);

  useEffect(() => {
    const sync = () => {
      const isLoginPage = pathname === LOGIN_PATH;
      const hasToken = getAccessToken() != null;

      if (!hasToken && !isLoginPage) {
        setAllowed(false);
        router.replace(LOGIN_PATH);
        return;
      }

      setAllowed(true);
    };

    sync();
    window.addEventListener(ACCESS_TOKEN_EVENT, sync);
    return () => window.removeEventListener(ACCESS_TOKEN_EVENT, sync);
  }, [pathname, router]);

  if (!allowed) {
    return null;
  }

  return children;
};

export default AuthGate;
