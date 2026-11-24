"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/util/Auth/api";
import { setAccessToken } from "@/util/Auth/token";

const inputClassName =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500";

const LoginForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          password,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          typeof body.error === "string"
            ? body.error
            : "로그인에 실패했습니다.",
        );
        return;
      }

      if (typeof body.token === "string" && body.token !== "") {
        setAccessToken(body.token);
      }

      router.push("/");
    } catch {
      setError("서버에 연결하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(24,24,27,0.06)] dark:border-[#2a2b33] dark:bg-[#17181d] dark:shadow-none"
    >
      <div className="grid gap-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            아이디
          </span>
          <input
            required
            autoComplete="username"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="아이디"
            className={inputClassName}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            비밀번호
          </span>
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            className={inputClassName}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      >
        {submitting ? "로그인 중" : "로그인"}
      </button>
    </form>
  );
};

export default LoginForm;
