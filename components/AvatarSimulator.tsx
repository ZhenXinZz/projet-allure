"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Wind } from "lucide-react";

type AvatarSimulatorProps = {
  /** Product name (displayed in caption). */
  productName?: string;
};

/**
 * US2 + US3 — Simulation mouvement & Vue en mouvement (marche)
 *
 * Composant unique pour les deux US, basé sur le même avatar SVG du projet :
 *  - US2 : léger mouvement (bras + torsion) — durée ≤ 5 s, infiniment rejouable.
 *  - US3 : marche complète (8-12 s), pausable / rejouable.
 *
 * Implémentation : CSS @keyframes (twist, walk) + classes utilitaires Tailwind
 * définies dans app/globals.css. Pas de dépendance externe, pas de librairie
 * d'animation, pas de moteur physique — la simulation de tissu est représentée
 * par un léger "flottement" (décalage de phase) des éléments du vêtement
 * pendant la marche.
 */
export default function AvatarSimulator({ productName }: AvatarSimulatorProps) {
  const [walkPlaying, setWalkPlaying] = useState(false);
  const [twistPlaying, setTwistPlaying] = useState(false);
  const walkTimeoutRef = useRef<number | null>(null);

  // Walk duration picked inside [8000, 12000] ms (US3 critère).
  const WALK_DURATION_MS = 10000;
  // Twist duration (US2 critère : ≤ 5 s).
  const TWIST_DURATION_MS = 4200;

  const stopWalk = useCallback(() => {
    setWalkPlaying(false);
    if (walkTimeoutRef.current !== null) {
      window.clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = null;
    }
  }, []);

  const startWalk = useCallback(() => {
    stopWalk();
    setWalkPlaying(true);
    walkTimeoutRef.current = window.setTimeout(() => {
      setWalkPlaying(false);
      walkTimeoutRef.current = null;
    }, WALK_DURATION_MS);
  }, [stopWalk]);

  const startTwist = useCallback(() => {
    setTwistPlaying(true);
    window.setTimeout(() => setTwistPlaying(false), TWIST_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="rounded-[28px] border border-[#d7cab2] bg-[#fbf8f1] p-4 shadow-[0_10px_24px_rgba(55,43,28,0.08)]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1d1813]">
            Essai dynamique
          </h2>
          <p className="mt-1 text-sm text-[#746857]">
            {productName
              ? `Observez le rendu de « ${productName} » en mouvement.`
              : "Observez votre tenue en mouvement."}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe3ca] text-[#a78953]">
          <Wind size={18} />
        </div>
      </div>

      {/* Stage — SVG avatar with two CSS-driven animation classes. */}
      <div className="relative mx-auto flex h-[280px] w-full max-w-[260px] items-end justify-center overflow-hidden rounded-[22px] border border-[#eadfcb] bg-[linear-gradient(180deg,#f7f2ea_0%,#ece2d0_100%)]">
        <svg
          viewBox="0 0 120 270"
          className={`h-[260px] w-[110px] ${
            twistPlaying ? "avatar-twist" : ""
          } ${walkPlaying ? "avatar-walk" : ""}`}
        >
          <defs>
            <linearGradient id="bodyGradientSim" x1="0" x2="1">
              <stop offset="0%" stopColor="#ece2cf" />
              <stop offset="55%" stopColor="#d8c4a2" />
              <stop offset="100%" stopColor="#f6f1e7" />
            </linearGradient>
            <linearGradient id="garmentGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#7b5a3a" />
              <stop offset="100%" stopColor="#5a4128" />
            </linearGradient>
          </defs>

          {/* Head */}
          <circle
            cx="60"
            cy="25"
            r="16"
            fill="url(#bodyGradientSim)"
            stroke="#b79a63"
            strokeWidth="1.5"
          />

          {/* Body / garment — single path, gets a subtle float when walking. */}
          <g className="garment-float">
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
              fill="url(#garmentGradient)"
              stroke="#3d2d1c"
              strokeWidth="1.2"
            />
            {/* Stitching details to make the garment more realistic. */}
            <line
              x1="44"
              y1="65"
              x2="76"
              y2="65"
              stroke="#a37c4d"
              strokeDasharray="2 2"
              strokeWidth="0.8"
            />
            <line
              x1="40"
              y1="100"
              x2="80"
              y2="100"
              stroke="#a37c4d"
              strokeDasharray="2 2"
              strokeWidth="0.8"
            />
            <line
              x1="38"
              y1="135"
              x2="82"
              y2="135"
              stroke="#a37c4d"
              strokeDasharray="2 2"
              strokeWidth="0.8"
            />
          </g>

          {/* Left arm — separate group, swings while walking. */}
          <g className="arm-left" style={{ transformOrigin: "44px 62px" }}>
            <path
              d="M44 62 L28 113
                 C26 120, 30 126, 36 126
                 L49 91"
              fill="none"
              stroke="#5a4128"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          {/* Right arm — opposite swing. */}
          <g className="arm-right" style={{ transformOrigin: "76px 62px" }}>
            <path
              d="M76 62 L92 113
                 C94 120, 90 126, 84 126
                 L71 91"
              fill="none"
              stroke="#5a4128"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Legs — swing while walking. */}
          <g className="leg-left" style={{ transformOrigin: "52px 180px" }}>
            <path
              d="M52 180 L48 240 C47 248, 53 250, 56 245 L60 200"
              fill="#3d2d1c"
              stroke="#1d1410"
              strokeWidth="1"
            />
          </g>
          <g className="leg-right" style={{ transformOrigin: "68px 180px" }}>
            <path
              d="M68 180 L72 240 C73 248, 67 250, 64 245 L60 200"
              fill="#3d2d1c"
              stroke="#1d1410"
              strokeWidth="1"
            />
          </g>

          {/* Floor shadow — bounces while walking. */}
          <ellipse
            cx="60"
            cy="262"
            rx="34"
            ry="3"
            fill="#b79a63"
            opacity="0.35"
            className={walkPlaying ? "shadow-bounce" : ""}
          />
        </svg>
      </div>

      {/* Status line. */}
      <p className="mt-3 text-center text-xs text-[#746857]" aria-live="polite">
        {walkPlaying
          ? "Marche en cours…"
          : twistPlaying
          ? "Simulation de mouvement en cours…"
          : "Choisissez une animation pour évaluer le réalisme du vêtement."}
      </p>

      {/* US2 — Simulation mouvement. */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={startTwist}
          disabled={twistPlaying || walkPlaying}
          className="flex flex-1 items-center justify-center rounded-full bg-[#f6efdf] px-4 py-2.5 text-sm font-semibold text-[#2c241b] disabled:opacity-50"
        >
          <Wind size={15} className="mr-2" />
          {twistPlaying ? "Animation…" : "Léger mouvement"}
        </button>
      </div>

      {/* US3 — Vue en mouvement (marche). */}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={walkPlaying ? stopWalk : startWalk}
          aria-label={walkPlaying ? "Mettre en pause la marche" : "Démarrer la marche"}
          className="flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(90deg,#b99f68_0%,#d8c08a_40%,#aa8d58_100%)] px-4 py-2.5 text-sm font-semibold text-[#1a1510]"
        >
          {walkPlaying ? (
            <>
              <Pause size={15} className="mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play size={15} className="mr-2" />
              {walkPlaying === false && twistPlaying
                ? "Marche"
                : "Voir en marche"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            stopWalk();
            startWalk();
          }}
          disabled={!walkPlaying && !twistPlaying}
          aria-label="Rejouer la marche"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cab2] bg-white text-[#2b241d] disabled:opacity-40"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
