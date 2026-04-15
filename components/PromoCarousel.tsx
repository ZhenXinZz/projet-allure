"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Megaphone, Sparkles, Tag } from "lucide-react";

type PromoSlide = {
  id: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  icon: "sparkles" | "tag" | "megaphone";
};

const slides: PromoSlide[] = [
  {
    id: "avatar",
    title: "ESSAYEZ VIRTUELLEMENT",
    text: "Trouvez votre taille ideale avec notre avatar 3D intelligent.",
    cta: "Creer mon avatar",
    href: "/essayage",
    icon: "sparkles",
  },
  {
    id: "new-brand",
    title: "NOUVELLES MARQUES",
    text: "ASOS, Zalando et Stradivarius viennent d'arriver sur Allure.",
    cta: "Voir les marques",
    href: "/catalogue",
    icon: "megaphone",
  },
  {
    id: "promo",
    title: "PROMOS DU MOMENT",
    text: "Jusqu'a -30% sur les vestes et robes de la selection printemps.",
    cta: "Voir les promos",
    href: "/catalogue",
    icon: "tag",
  },
];

function SlideIcon({ icon }: { icon: PromoSlide["icon"] }) {
  if (icon === "tag") {
    return <Tag size={16} />;
  }
  if (icon === "megaphone") {
    return <Megaphone size={16} />;
  }
  return <Sparkles size={16} />;
}

export default function PromoCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="mb-3 rounded-[20px] border border-[#d7cab2] bg-[linear-gradient(135deg,#ead7ad_0%,#cfb077_48%,#f4e8d0_100%)] p-3 text-[#1f1a15] shadow-[0_10px_22px_rgba(111,89,44,0.14)]">
      <div className="relative min-h-[108px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
              index === activeSlide
                ? "translate-x-0 opacity-100"
                : index < activeSlide
                  ? "-translate-x-6 opacity-0"
                  : "translate-x-6 opacity-0"
            }`}
          >
            <p className="mb-0.5 text-[1.02rem] font-semibold uppercase tracking-wide">
              {slide.title}
            </p>
            <p className="max-w-[250px] text-[0.82rem] leading-snug text-[#3c3128]">
              {slide.text}
            </p>

            <Link
              href={slide.href}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#6a5328] bg-[#f8ecd0]/90 px-3 py-1 text-[0.7rem] font-medium text-[#4b3a25]"
            >
              <SlideIcon icon={slide.icon} />
              <span className="ml-2">{slide.cta}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
