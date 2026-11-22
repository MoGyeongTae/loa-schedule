import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <p className="text-center text-sm font-medium tracking-wide text-zinc-400">
          Loa Schedule
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          로그인
        </h1>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
