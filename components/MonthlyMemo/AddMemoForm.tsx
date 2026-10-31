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
      className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            제목
          </span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 로스트아크"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            내용
          </span>
          <textarea
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={5}
            placeholder="이번 달 특이사항을 적어 주세요"
            className="w-full resize-none rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="cursor-pointer rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
        >
          취소
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          추가
        </button>
      </div>
    </form>
  );
};

export default AddMemoForm;
