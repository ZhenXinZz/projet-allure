"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import {
  CircleHelp,
  Ruler,
  Scale,
  Sparkles,
  Check,
  ChevronRight,
} from "lucide-react";

const morphotypes = ["Hommes", "Femmes", "Unisexe"];

function AvatarFigure() {
  return (
    <div className="mx-auto w-[110px]">
      <svg viewBox="0 0 120 270" className="h-[270px] w-full">
        <defs>
          <linearGradient id="bodyGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#ece2cf" />
            <stop offset="55%" stopColor="#d8c4a2" />
            <stop offset="100%" stopColor="#f6f1e7" />
          </linearGradient>
        </defs>

        <circle
          cx="60"
          cy="25"
          r="16"
          fill="url(#bodyGradient)"
          stroke="#b79a63"
          strokeWidth="1.5"
        />

        <path
          d="M44 45 C47 63, 46 77, 40 99
             C36 114, 38 126, 44 136
             C49 145, 48 160, 42 184
             L36 226
             C35 235, 39 240, 46 240
             L56 194
             L60 146
             L64 194
             L74 240
             C81 240, 85 235, 84 226
             L78 184
             C72 160, 71 145, 76 136
             C82 126, 84 114, 80 99
             C74 77, 73 63, 76 45
             Z"
          fill="url(#bodyGradient)"
          stroke="#b79a63"
          strokeWidth="1.5"
        />

        <path
          d="M44 62 L28 113
             C26 120, 30 126, 36 126
             L49 91"
          fill="none"
          stroke="#b79a63"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M76 62 L92 113
             C94 120, 90 126, 84 126
             L71 91"
          fill="none"
          stroke="#b79a63"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <line
          x1="35"
          y1="95"
          x2="85"
          y2="95"
          stroke="#cdb183"
          strokeDasharray="4 3"
          strokeWidth="1.5"
        />
        <line
          x1="37"
          y1="127"
          x2="83"
          y2="127"
          stroke="#cdb183"
          strokeDasharray="4 3"
          strokeWidth="1.5"
        />
        <line
          x1="39"
          y1="149"
          x2="81"
          y2="149"
          stroke="#cdb183"
          strokeDasharray="4 3"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function SmallInput({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-[12px] font-medium text-[#3b3127]">{label}</p>
      <div className="flex h-10 items-center gap-2 rounded-2xl border border-[#d8cab2] bg-[#fbf8f1] px-3 text-sm text-[#8a7d69]">
        {icon}
        <span>{placeholder}</span>
      </div>
    </div>
  );
}

export default function EssayagePage() {
  const [selectedMorphotype, setSelectedMorphotype] = useState("Femmes");

  return (
    <>
      <main className="px-4 pb-28 pt-14">
        <div className="mb-5">
          <p
            className="text-[15px] tracking-[0.18em] text-[#b79a63]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Allure
          </p>
          <h1 className="text-xl font-semibold text-[#1b1712]">
            Base de votre Avatar
          </h1>
          <p className="text-sm text-[#7a6d5b]">
            Générez un morphotype puis affinez vos mensurations.
          </p>
        </div>

        <section className="mb-4 rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
          <div className="mb-4 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#efe3ca] text-[#a78953]">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-semibold text-[#1d1813]">
              Base de votre Avatar
            </h2>
            <p className="mx-auto mt-1 max-w-[260px] text-sm text-[#746857]">
              Sélectionnez une base de départ cohérente pour débuter l’ajustement.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {morphotypes.map((item) => {
              const active = selectedMorphotype === item;

              return (
                <button
                  key={item}
                  onClick={() => setSelectedMorphotype(item)}
                  className={`rounded-[20px] border p-3 text-center shadow-sm ${
                    active
                      ? "border-[#c9ae72] bg-[linear-gradient(180deg,#f8f1df_0%,#efe3ca_100%)] shadow-[0_12px_24px_rgba(153,122,60,0.18)]"
                      : "border-[#ddd1bd] bg-white"
                  }`}
                >
                  <div className="mx-auto mb-3 flex h-24 w-14 items-center justify-center rounded-[18px] border border-[#d9ccb8] bg-[linear-gradient(180deg,#f5f1e8_0%,#e7ddcc_100%)]">
                    <div className="h-16 w-8 rounded-[999px] border border-[#9e9077]" />
                  </div>
                  <span className="text-sm font-semibold text-[#2c241b]">
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] text-sm font-semibold text-[#1a1510]">
            Suivant
          </button>
        </section>

        <section className="mb-4 rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
          <h2 className="mb-4 text-xl font-semibold text-[#1d1813]">
            Mensurations Clés
          </h2>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <SmallInput
              label="Taille (cm)"
              placeholder="170"
              icon={<Ruler size={14} />}
            />
            <SmallInput
              label="Poids (kg)"
              placeholder="63"
              icon={<Scale size={14} />}
            />
          </div>

          <div className="grid grid-cols-[1fr_110px_1fr] gap-2">
            <div className="space-y-3">
              <SmallInput label="Largeur d’épaule" placeholder="72" />
              <SmallInput label="Tour de poitrine" placeholder="89" />
              <SmallInput label="Tour de taille" placeholder="68" />
            </div>

            <div className="flex items-center justify-center">
              <AvatarFigure />
            </div>

            <div className="space-y-3">
              <SmallInput label="Hanches" placeholder="93" />
              <SmallInput label="Entrejambe" placeholder="81" />
              <SmallInput label="Poignet" placeholder="15" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-[22px] bg-[#f2eadc] p-3 text-sm text-[#5f5448]">
            <Check size={16} className="text-[#9a804b]" />
            Vos mensurations sont complètes et prêtes pour générer l’avatar.
          </div>

          <div className="mt-4 flex gap-3">
            <button className="flex flex-1 items-center justify-center rounded-full border border-[#cbb182] bg-[#f6efdf] px-4 py-3 text-sm font-semibold text-[#2c241b]">
              <CircleHelp size={16} className="mr-2" />
              Guide Visuel
            </button>

            <button className="flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] px-4 py-3 text-sm font-semibold text-[#1a1510]">
              Enregistrer
            </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
          <h2 className="mb-4 text-xl font-semibold text-[#1d1813]">
            Guide Visuel de Mesure
          </h2>

          {[
            {
              title: "Poitrine",
              text: "Ruban horizontal à plat au point le plus large.",
            },
            {
              title: "Taille",
              text: "À l’endroit le plus creux, posture droite et détendue.",
            },
            {
              title: "Hanches",
              text: "À l’endroit le plus large, sans serrer le ruban.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="mb-3 flex items-center gap-3 rounded-[22px] border border-[#ddd1bd] bg-white p-3"
            >
              <div className="flex h-20 w-24 items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#f7f2ea_0%,#ece2d0_100%)]">
                <div className="relative h-14 w-10 rounded-[999px] border border-[#8f816b]">
                  <div className="absolute left-1/2 top-1/2 h-[2px] w-12 -translate-x-1/2 -translate-y-1/2 bg-[#c5a76f]" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-base font-semibold text-[#1d1813]">
                  {item.title}.
                </p>
                <p className="text-sm text-[#5f5448]">{item.text}</p>
              </div>

              <ChevronRight size={18} className="text-[#8f816b]" />
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between rounded-[22px] bg-[#f2eadc] px-4 py-3">
            <div>
              <p className="font-semibold text-[#1d1813]">Conseils</p>
              <p className="text-sm text-[#5f5448]">Posture droite, détendue.</p>
            </div>

            <button className="rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] px-5 py-2 text-sm font-semibold text-[#1a1510]">
              Fermer
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}