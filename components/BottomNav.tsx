"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Sparkles, Heart, User, LayoutGrid } from "lucide-react";

const items = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/essayage", label: "Avatar", icon: Sparkles },
  { href: "/catalogue", label: "Catalogue", icon: LayoutGrid },
  { href: "/panier", label: "Favoris", icon: Heart },
  { href: "/login", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 rounded-t-[22px] border-t border-[#d7cab2] bg-[#f6f1e7]/98 shadow-[0_-8px_22px_rgba(24,19,14,0.12)] backdrop-blur">
      <div className="grid grid-cols-5 px-1 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[52px] flex-col items-center justify-start gap-0.5 py-0.5"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  active
                    ? "bg-[#1b1712] text-[#d7bf8a] shadow-[0_8px_20px_rgba(27,23,18,0.22)]"
                    : "text-[#746a5c]"
                }`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`block text-[10px] leading-[1.15] ${
                  active ? "font-semibold text-[#1b1712]" : "text-[#746a5c]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
