// components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-red-500 font-semibold" : "text-white";

  return (
    <nav className="w-full bg-gray-900 px-6 py-4 shadow-md flex justify-center gap-8 fixed top-0 z-50">
      <Link href="/" className={isActive("/")}>
        Početna
      </Link>
      <Link href="/pretraga" className={isActive("/pretraga")}>
        Istraži
      </Link>
      <Link href="/favorite" className={isActive("/favorite")}>
        Favoriti
      </Link>
    </nav>
  );
}
