"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Sparkles, ShoppingBag, User, LayoutGrid } from "lucide-react";
import { useCart } from "@/lib/useCart";

const items = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/essayage", label: "Avatar", icon: Sparkles },
  { href: "/catalogue", label: "Catalogue", icon: LayoutGrid },
  { href: "/panier", label: "Panier", icon: ShoppingBag },
  { href: "/login", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { ready, itemCount } = useCart();
  const showCount = ready && itemCount > 0;

  return (
    <nav
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-[22px] border border-[#d7cab2] bg-[#f6f1e7]/98 shadow-[0_-8px_22px_rgba(24,19,14,0.12)] backdrop-blur"
      style={{
        width:
          "min(376px, calc(100vw - 44px), calc((100dvh - 28px) * 440 / 956 - 16px))",
      }}
    >
      <div className="grid grid-cols-5 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const isCart = item.href === "/panier";

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-[52px] flex-col items-center justify-start gap-0.5 py-0.5"
            >
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  active
                    ? "bg-[#1b1712] text-[#d7bf8a] shadow-[0_8px_20px_rgba(27,23,18,0.22)]"
                    : "text-[#746a5c]"
                }`}
              >
                <Icon size={16} />
                {isCart && showCount ? (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#12703a] px-1 text-[9px] font-semibold leading-none text-white">
                    {itemCount}
                  </span>
                ) : null}
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
