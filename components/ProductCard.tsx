"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
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
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || product.images.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setActiveImageIndex((prev) => {
        setPreviousImageIndex(prev);
        return (prev + 1) % product.images.length;
      });
    }, 1250);
    return () => window.clearInterval(interval);
  }, [hovered, product.images.length]);

  useEffect(() => {
    if (previousImageIndex === null) {
      return;
    }
    const timeout = window.setTimeout(() => {
      setPreviousImageIndex(null);
    }, 260);
    return () => window.clearTimeout(timeout);
  }, [previousImageIndex]);

  return (
    <article className="overflow-hidden rounded-[19px] border border-[#d8cab2] bg-[#fbf8f1] shadow-[0_6px_16px_rgba(55,43,28,0.08)]">
      <Link
        href={`/catalogue/${product.id}`}
        className="block"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setPreviousImageIndex(null);
          setActiveImageIndex(0);
        }}
      >
        <div className="relative h-32 overflow-hidden">
          {previousImageIndex !== null ? (
            <Image
              key={`${product.id}-prev-${previousImageIndex}`}
              src={product.images[previousImageIndex] ?? product.image}
              alt={product.name}
              width={600}
              height={500}
              className="card-slide-out-left absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <Image
            key={`${product.id}-current-${activeImageIndex}`}
            src={product.images[activeImageIndex] ?? product.image}
            alt={product.name}
            width={600}
            height={500}
            className={`absolute inset-0 h-full w-full object-cover ${
              previousImageIndex === null ? "" : "card-slide-in-left"
            }`}
          />

          {brandLogo ? (
            <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/95">
              <Image src={brandLogo} alt={product.brand} width={20} height={20} />
            </div>
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
