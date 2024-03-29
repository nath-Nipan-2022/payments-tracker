import Link from "next/link";
import { HeaderAuth } from "./header-auth";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-inherit text-teal-800"
        >
          <Image src="/logo.png" alt="logo" width={24} height={24} />
          <span className="hidden md:block">EduPurse</span>
        </Link>

        <HeaderAuth />
      </div>
    </header>
  );
}
