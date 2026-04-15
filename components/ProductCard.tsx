"use client";

import { type MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { brands, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  favorite: boolean;
  onToggleFavorite: (productId: number) => void;
};

export default function ProductCard({
  product,
  favorite,
  onToggleFavorite,
}: ProductCardProps) {
  const brandLogo = brands.find((brand) => brand.id === product.brandId)?.logo;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasGallery = product.images.length > 1;

  function showPreviousImage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  }

  function showNextImage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  }

  return (
    <article className="overflow-hidden rounded-[19px] border border-[#d8cab2] bg-[#fbf8f1] shadow-[0_6px_16px_rgba(55,43,28,0.08)]">
      <Link href={`/catalogue/${product.id}`} className="block">
        <div className="relative">
          <Image
            src={product.images[activeImageIndex] ?? product.image}
            alt={product.name}
            width={600}
            height={500}
            className="h-32 w-full object-cover"
          />

          {brandLogo ? (
            <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/95">
              <Image src={brandLogo} alt={product.brand} width={20} height={20} />
            </div>
          ) : null}

          {hasGallery ? (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Image precedente"
                className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf1]/90 text-[#6f6250]"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Image suivante"
                className="absolute right-10 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf1]/90 text-[#6f6250]"
              >
                <ChevronRight size={13} />
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggleFavorite(product.id);
            }}
            aria-label={
              favorite
                ? "Retirer le produit des favoris"
                : "Ajouter le produit aux favoris"
            }
            className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full ${
              favorite
                ? "bg-[#1b1712] text-[#d8c08a]"
                : "bg-[#fffaf1]/90 text-[#7e6c57]"
            }`}
          >
            <Heart size={14} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-2.5">
          <p className="line-clamp-2 min-h-[2.2rem] text-[0.76rem] leading-tight text-[#2d241a]">
            {product.name}
          </p>
          <div className="mt-0.5 flex items-center justify-between">
            <span className="text-[0.7rem] text-[#8a7d69]">{product.size}</span>
            <span className="text-[0.8rem] font-semibold text-[#1d1813]">
              {product.price}€
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
