import Link from "next/link";
import AddMemoForm from "@/components/MonthlyMemo/AddMemoForm";

export default function AddMemoPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
        ← 캘린더로
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-zinc-900">메모 추가</h1>
      <div className="mt-6 max-w-xl">
        <AddMemoForm />
      </div>
    </div>
  );
}
