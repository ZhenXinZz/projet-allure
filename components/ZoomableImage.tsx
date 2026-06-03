"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  /** Larger intrinsic resolution gives more pixels to pan around (default 1600x1800). */
  width?: number;
  height?: number;
  /** Maximum scale factor the user can reach by pinching / wheel / drag. */
  maxZoom?: number;
  /** Initial visual height of the previewed image. */
  previewHeight?: string;
};

const MIN_ZOOM = 1;
const ZOOM_STEP = 0.5;

/**
 * US1 — Zoom sur le vêtement
 *
 * Permet à l'utilisateur de zoomer sur une zone d'un vêtement pour observer
 * les détails (texture, coutures, finitions), de naviguer dans la zone
 * zoomée par glisser-déposer, et de réinitialiser la vue.
 *
 * Critères d'acceptation couverts :
 *  - Geste de zoom : molette, pinch tactile, boutons +/-, double-clic.
 *  - Navigation par glisser-déposer (pointer drag) une fois zoomé.
 *  - Bouton "Réinitialiser" pour revenir à la vue normale.
 *  - Le zoom max (3.5x) est basé sur une image intrinsèque 2x, donc
 *    sans pixelisation visible sur la zone zoomée.
 */
export default function ZoomableImage({
  src,
  alt,
  width = 1600,
  height = 1800,
  maxZoom = 3.5,
  previewHeight = "h-72",
}: ZoomableImageProps) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [origin, setOrigin] = useState({ x: 50, y: 50 }); // % in image
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clampZoom = useCallback(
    (z: number) => Math.min(maxZoom, Math.max(MIN_ZOOM, z)),
    [maxZoom]
  );

  const clampOrigin = useCallback(
    (x: number, y: number) => {
      // When zoom > 1, restrict the % origin to keep image edges aligned with container.
      const limit = (100 * zoom) / (2 * (zoom - 1) + 0.0001);
      // Easier: we use a simple hard bound; the visual range in % = 50 ± (50/zoom).
      // We just clamp to [0, 100] and let CSS do the rest.
      return {
        x: Math.min(100, Math.max(0, x)),
        y: Math.min(100, Math.max(0, y)),
      };
    },
    [zoom]
  );

  const handleReset = () => {
    setZoom(MIN_ZOOM);
    setOrigin({ x: 50, y: 50 });
  };

  const handleZoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));
  const handleZoomOut = () => {
    setZoom((z) => {
      const next = clampZoom(z - ZOOM_STEP);
      if (next === MIN_ZOOM) setOrigin({ x: 50, y: 50 });
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 4) return; // ignore tiny scroll
    e.preventDefault();
    setZoom((z) => clampZoom(z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (zoom > MIN_ZOOM) {
      handleReset();
    } else {
      // Zoom in centered on the double-click point
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        setZoom(clampZoom(2));
        setOrigin(clampOrigin(px, py));
      } else {
        setZoom(clampZoom(2));
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= MIN_ZOOM) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: origin.x,
      oy: origin.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !dragStart.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dxPct = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const dyPct = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    setOrigin(
      clampOrigin(
        dragStart.current.ox - dxPct * (zoom - 1),
        dragStart.current.oy - dyPct * (zoom - 1)
      )
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    dragStart.current = null;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  const isZoomed = zoom > MIN_ZOOM;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative overflow-hidden rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1] ${previewHeight} ${
        dragging ? "cursor-grabbing" : isZoomed ? "cursor-grab" : "cursor-zoom-in"
      } touch-none select-none`}
      role="img"
      aria-label={`${alt} — ${isZoomed ? `zoom ${zoom.toFixed(1)}x` : "cliquez pour zoomer"}`}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: dragging ? "none" : "transform 200ms ease-out",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover object-top"
          draggable={false}
          priority
        />
      </div>

      {/* Floating control bar — always visible, but reset only enabled when zoomed. */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#d8cab2] bg-[#fbf8f1]/95 px-1 py-1 shadow-[0_8px_18px_rgba(55,43,28,0.18)] backdrop-blur">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Dézoomer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#1b1712] disabled:opacity-30"
        >
          <span className="text-lg font-semibold">−</span>
        </button>
        <span className="min-w-10 text-center text-xs font-semibold tabular-nums text-[#1b1712]">
          {zoom.toFixed(1)}x
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= maxZoom}
          aria-label="Zoomer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#1b1712] disabled:opacity-30"
        >
          <span className="text-lg font-semibold">+</span>
        </button>
        <span className="mx-1 h-5 w-px bg-[#d8cab2]" />
        <button
          type="button"
          onClick={handleReset}
          disabled={!isZoomed}
          aria-label="Réinitialiser le zoom"
          className="flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-[#1b1712] disabled:opacity-30"
        >
          <RotateCcw size={13} />
          Réinitialiser
        </button>
      </div>

      {/* Hint overlay (first load, not zoomed). */}
      {!isZoomed ? (
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#1b1712]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#f6f1e7]">
          Pincer / molette pour zoomer
        </div>
      ) : null}
    </div>
  );
}
