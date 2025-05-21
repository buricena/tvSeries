"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabNavigacija({ name }: { name: string }) {
  const pathname = usePathname();

  const tabovi = [
    { label: "Epizode", href: `/serija/${name}/epizode` },
    { label: "Glumci", href: `/serija/${name}/glumci` },
  ];

  return (
    <div className="flex justify-center border-b border-gray-700 mb-6">
      {tabovi.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 ${
              isActive ? "text-red-500" : "text-white hover:text-red-400"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-full transition-all duration-300" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
