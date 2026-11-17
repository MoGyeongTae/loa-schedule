"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const COLORS = [
  { id: "yellow", bg: "#fef08a", label: "노랑" },
  { id: "pink", bg: "#fda4af", label: "분홍" },
  { id: "green", bg: "#86efac", label: "초록" },
  { id: "blue", bg: "#93c5fd", label: "파랑" },
];

const AddMemoForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-[#2a2b33] dark:bg-[#17181d]"
    >
      <div className="grid gap-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            제목
          </span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 로스트아크"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            내용
          </span>
          <textarea
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={5}
            placeholder="이번 달 특이사항을 적어 주세요"
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-[#2a2b33] dark:bg-[#121318] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="cursor-pointer rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-[#23242b]"
        >
          취소
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default AddMemoForm;
