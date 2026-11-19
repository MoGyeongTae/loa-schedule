import Link from "next/link";
import ThemeToggle from "@/components/layouts/ThemeToggle";

const Header = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-[76px] w-full bg-white py-4 shadow-sm dark:border-b dark:border-[#2a2b33] dark:bg-[#121318] dark:shadow-none">
      <div className="flex h-full items-center px-6">
        <h1 className="text-zinc-900 dark:text-zinc-100">
          <Link href="/">Loa Schedule</Link>
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
