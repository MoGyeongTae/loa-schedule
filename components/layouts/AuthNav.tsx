"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ACCESS_TOKEN_EVENT,
  clearAccessToken,
  getAccessToken,
} from "@/util/Auth/token";

const AuthNav = () => {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const sync = () => setHasToken(getAccessToken() != null);
    sync();
    window.addEventListener(ACCESS_TOKEN_EVENT, sync);
    return () => window.removeEventListener(ACCESS_TOKEN_EVENT, sync);
  }, []);

  const handleLogout = () => {
    clearAccessToken();
    setHasToken(false);
    router.push("/login");
  };

  if (!hasToken) {
    return (
      <Link
        href="/login"
        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        로그인
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      로그아웃
    </button>
  );
};

export default AuthNav;
