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

const morphotypes = [
  { name: "Hommes", img: "/avatar/avatar_male_1776269159060.png" },
  { name: "Femmes", img: "/avatar/avatar_female_1776269511074.png" },
  { name: "Unisexe", img: "/avatar/avatar_unisex_1776269532587.png" }
];

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
      <div className="flex h-10 items-center justify-between gap-2 rounded-2xl border border-[#d8cab2] bg-[#fbf8f1] px-3 py-1 text-sm text-[#8a7d69]">
        {icon}
        <input 
          type="text" 
          defaultValue={placeholder}
          className="w-full bg-transparent outline-none text-right font-medium text-[#1a1510]" 
        />
      </div>
    </div>
  );
}

export default function EssayagePage() {
  const [selectedMorphotype, setSelectedMorphotype] = useState("Femmes");
  const [step, setStep] = useState<"base" | "mensurations" | "guide">("base");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const avatarImage = morphotypes.find(m => m.name === selectedMorphotype)?.img;

  return (
    <>
      <main className="px-4 pb-28 pt-14 space-y-6">
        
        {step === "base" && (
          <>
            <div className="mb-4">
              <div className="flex justify-center mb-6">
                <img src={avatarImage} alt="top avatar" className="h-16 w-auto object-contain mix-blend-multiply opacity-70" />
              </div>
              <h1 className="text-2xl font-semibold text-[#1b1712] text-center mb-2">
                Base de votre Avatar
              </h1>
              <p className="text-sm text-[#7a6d5b] text-center">
                Générez un morphotype.
                <br />
                Sélectionnez une base de départ
              </p>
            </div>

            {/* SECTION 1: BASE DE L'AVATAR */}
            <section className="rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 pb-6 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
              <div className="grid grid-cols-3 gap-3">
                {morphotypes.map((item) => {
                  const active = selectedMorphotype === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedMorphotype(item.name)}
                      className={`relative flex flex-col items-center justify-between overflow-hidden rounded-[20px] p-2 pt-3 pb-3 transition-colors ${
                        active
                          ? "border border-[#c9ae72] bg-[linear-gradient(180deg,#f8f1df_0%,#efe3ca_100%)] shadow-[0_12px_24px_rgba(153,122,60,0.18)]"
                          : "border border-[#ddd1bd] bg-white opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-center h-[120px] mb-2 w-full">
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="h-full w-full object-contain mix-blend-multiply drop-shadow-md" 
                        />
                      </div>
                      <span className={`text-sm font-semibold ${active ? "text-[#2c241b]" : "text-[#5f5448]"}`}>
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setStep("mensurations")}
                className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] text-[15px] font-semibold text-[#1a1510] shadow-[0_4px_14px_rgba(185,159,104,0.3)] transition-transform active:scale-95"
              >
                Suivant
              </button>
            </section>
          </>
        )}

        {step === "mensurations" && (
          <>
            {/* SECTION 2: MENSURATIONS CLES */}
            <section className="rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-5 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1d1813] text-center w-full">
                  Mensurations Clés
                </h2>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <SmallInput
                  label="Taille (cm)"
                  placeholder="170 cm"
                  icon={<Ruler size={16} />}
                />
                <SmallInput
                  label="Poids (kg)"
                  placeholder="63 kg"
                  icon={<Scale size={16} />}
                />
              </div>

              <div className="relative mb-8 flex h-[340px] items-center justify-between pr-2">
                
                {/* AVATAR LEFT SIDE */}
                <div className="relative h-full w-[150px] flex justify-center mix-blend-multiply z-10">
                  <img 
                    src={avatarImage} 
                    alt="Avatar Measurement" 
                    className="h-full w-auto object-contain" 
                  />
                </div>

                {/* SVG LINES TO CONNECT (ABSOLUTE) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <path d="M 120 125 L 180 125" stroke="#b79a63" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 115 165 L 180 165" stroke="#b79a63" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 125 195 L 160 195 L 160 215 L 180 215" fill="transparent" stroke="#b79a63" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* INPUTS RIGHT SIDE */}
                <div className="flex-1 max-w-[150px] flex flex-col justify-center gap-6 z-10">
                  <div className="relative">
                    <SmallInput label="Tour de poitrine" placeholder="89" icon={<div className="text-[#a78953] w-4 h-4" ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 12a8 8 0 0116 0" /></svg></div>} />
                  </div>
                  <div className="relative">
                    <SmallInput label="Tour de taille" placeholder="68" icon={<div className="text-[#a78953] w-4 h-4" ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 12a8 8 0 0116 0" /></svg></div>} />
                  </div>
                  <div className="relative mt-2">
                    <SmallInput label="Tour de hanches" placeholder="93" icon={<div className="text-[#a78953] w-4 h-4" ><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 12l0 4M20 12l0 4" /></svg></div>} />
                  </div>

                  {/* SLIDER / TOGGLE FAKE */}
                  <div className="flex justify-end mt-2 pr-2">
                    <div className="w-[100px] h-6 flex items-center justify-between">
                        <div className="h-1.5 w-12 bg-[#d8cab2] rounded-full overflow-hidden">
                          <div className="h-full bg-[#a78953] w-[60%]"></div>
                        </div>
                        <div className="w-10 h-6 bg-[#d8cab2] rounded-full relative">
                          <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button 
                  onClick={() => setStep("guide")}
                  className="flex flex-1 items-center justify-center rounded-full border border-[#cbb182] bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] text-transparent bg-clip-text text-[15px] font-semibold transition-transform active:scale-95"
                >
                  Guide Visuel
                  <CircleHelp size={16} className="ml-2 text-[#a78953]" />
                </button>
                <button 
                  onClick={() => setShowSuccessModal(true)}
                  className="flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] px-4 py-3 text-[15px] font-semibold text-[#1a1510] shadow-[0_4px_14px_rgba(185,159,104,0.3)] transition-transform active:scale-95"
                >
                  Enregistrer
                </button>
              </div>
            </section>
          </>
        )}

        {step === "guide" && (
          <>
            {/* SECTION 3: GUIDE VISUEL DE MESURE */}
            <section className="rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
              <h2 className="mb-6 text-xl font-semibold text-[#1d1813] text-center">
                Guide Visuel de Mesure
              </h2>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Poitrine.",
                    text: "Ruban horizontal à plat.",
                    img: "/avatar/guide_chest_1776269713909.png"
                  },
                  {
                    title: "Taille.",
                    text: "À l’endroit le plus creux.",
                    img: "/avatar/guide_waist_1776269735373.png"
                  },
                  {
                    title: "Hanches.",
                    text: "À l’endroit le plus large.",
                    img: "/avatar/guide_hips_1776269811274.png"
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-[22px] border border-[#ddd1bd] bg-[#fbf8f1] p-3 shadow-sm"
                  >
                    <div className="flex w-[100px] h-[90px] items-center justify-center rounded-[18px] bg-white overflow-hidden border border-[#eae0cc]">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                    </div>

                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-[#1d1813] mb-1">
                        {item.title}
                      </p>
                      <p className="text-[13px] text-[#5f5448] leading-tight pr-2">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 mb-2">
                <div className="flex items-center gap-3 text-[#1d1813]">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="23" y2="8"></line><line x1="19" y1="12" x2="23" y2="12"></line><line x1="20" y1="16" x2="23" y2="16"></line></svg>
                  <div>
                    <p className="font-semibold text-[14px]">Conseils. <span className="font-normal text-[#5f5448]">Posture droite, détendue.</span></p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep("mensurations")}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] text-[15px] font-semibold text-[#1a1510] shadow-[0_4px_14px_rgba(185,159,104,0.3)] mt-6 transition-transform active:scale-95"
              >
                Fermer
              </button>
            </section>
          </>
        )}
      </main>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1813]/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-[300px] rounded-[28px] bg-[#fbf8f1] p-6 shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#efe3ca] text-[#a78953]">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold text-[#1d1813]">
              Succès
            </h3>
            <p className="mb-6 text-center text-[14px] text-[#5f5448]">
              Vos mensurations ont été enregistrées avec succès !
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] text-[15px] font-semibold text-[#1a1510] shadow-[0_4px_14px_rgba(185,159,104,0.3)] transition-transform active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}