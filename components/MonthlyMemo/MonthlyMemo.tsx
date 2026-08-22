const NOTES = [
  {
    id: "weekend-shift",
    date: "8/22",
    title: "주말 근무",
    body: "주말 근무 인원 확인. 교대 요청 있으면 금요일까지 받기.",
    color: "bg-[#fef08a]",
    rotate: "-rotate-2",
  },
  {
    id: "part-time",
    date: "8/24",
    title: "알바 특이사항",
    body: "모경태 알바 월·수·금. 이번 주 수요일은 30분 일찍 퇴근.",
    color: "bg-[#fda4af]",
    rotate: "rotate-1",
  },
  {
    id: "day-off",
    date: "8/25",
    title: "연차",
    body: "연차 대체 인력 필요. 오픈 담당 미리 지정할 것.",
    color: "bg-[#86efac]",
    rotate: "-rotate-1",
  },
  {
    id: "meeting",
    date: "8/26",
    title: "주간 미팅",
    body: "10:00 주간 미팅. 다음 달 근무표 초안 가져오기.",
    color: "bg-[#93c5fd]",
    rotate: "rotate-2",
  },
];

const MonthlyMemo = () => {
  return (
    <section className="mx-auto w-full min-w-0 max-w-6xl px-4 pt-8">
      <div className="rounded-xl border border-amber-200/80 bg-[#f6ecd8] p-5 shadow-sm">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-amber-800/70">
              2026년 8월
            </p>
            <h2 className="text-lg font-semibold text-zinc-800">월별 메모</h2>
          </div>
          <p className="text-xs text-amber-900/60">이번 달 특이사항</p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NOTES.map((note) => (
            <li key={note.id} className={note.rotate}>
              <article
                className={`relative min-h-[160px] p-4 shadow-[2px_6px_12px_rgba(0,0,0,0.12)] ${note.color}`}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 top-0 h-3 w-14 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-amber-200/80 shadow-sm"
                />
                <p className="text-[11px] font-medium text-zinc-500">{note.date}</p>
                <h3 className="mt-1 text-sm font-semibold text-zinc-800">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
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
