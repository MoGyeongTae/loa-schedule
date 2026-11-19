import Link from "next/link";

const NOTES = [
  {
    id: "weekend-shift",
    date: "8/22",
    title: "로스트아크",
    body: "TTTTT",
  },
  {
    id: "part-time",
    date: "8/24",
    title: "네버",
    body: "Test",
  },
  {
    id: "day-off",
    date: "8/25",
    title: "다이",
    body: "ㄴㄴ",
  },
  {
    id: "meeting",
    date: "8/26",
    title: "ㅇㅇ",
    body: "테스트",
  },
];

const MonthlyMemo = () => {
  return (
    <section className="mx-auto w-full min-w-0 max-w-6xl px-4 pt-8">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(24,24,27,0.06)] dark:border-[#2a2b33] dark:bg-[#17181d] dark:shadow-none">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              2026년 8월
            </p>
            <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              월별 메모
            </h2>
          </div>
          <Link
            href="/memo/add"
            className="rounded-full bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800 dark:bg-[#23242b] dark:text-zinc-300 dark:hover:bg-[#2f3038] dark:hover:text-white"
          >
            메모 추가
          </Link>
        </div>

        {NOTES.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-10 text-center text-sm text-zinc-400 dark:border-[#2a2b33]">
            이번 달 메모가 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-[#2a2b33]">
            {NOTES.map((note) => (
              <li key={note.id}>
                <article className="flex gap-4 py-3.5 first:pt-1 last:pb-0">
                  <time className="w-12 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-zinc-400">
                    {note.date}
                  </time>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {note.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {note.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MonthlyMemo;
