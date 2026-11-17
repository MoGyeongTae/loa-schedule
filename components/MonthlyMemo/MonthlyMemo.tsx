import Link from "next/link";

const NOTES = [
  {
    id: "weekend-shift",
    date: "8/22",
    title: "로스트아크",
    body: "TTTTT",
    accent: "#eab308",
    tint: "#fefce8",
  },
  {
    id: "part-time",
    date: "8/24",
    title: "네버",
    body: "Test",
    accent: "#f43f5e",
    tint: "#fff1f2",
  },
  {
    id: "day-off",
    date: "8/25",
    title: "다이",
    body: "ㄴㄴ",
    accent: "#22c55e",
    tint: "#f0fdf4",
  },
  {
    id: "meeting",
    date: "8/26",
    title: "ㅇㅇ",
    body: "테스트",
    accent: "#3b82f6",
    tint: "#eff6ff",
  },
];

const MonthlyMemo = () => {
  return (
    <section className="mx-auto w-full min-w-0 max-w-6xl px-4 pt-8">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(24,24,27,0.06)]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              2026년 8월
            </p>
            <h2 className="mt-0.5 text-lg font-semibold tracking-tight text-zinc-900">
              월별 메모
            </h2>
          </div>
          <Link
            href="/memo/add"
            className="rounded-full bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
          >
            메모 추가
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NOTES.map((note) => (
            <li key={note.id}>
              <article
                className="flex min-h-[148px] flex-col rounded-xl border border-zinc-200/80 p-4"
                style={{ backgroundColor: note.tint }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="h-1.5 w-8 rounded-full"
                    style={{ backgroundColor: note.accent }}
                  />
                  <p className="text-[11px] font-medium text-zinc-400">
                    {note.date}
                  </p>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-zinc-900">
                  {note.title}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {note.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MonthlyMemo;
