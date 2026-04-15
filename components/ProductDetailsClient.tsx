"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useFavorites } from "@/lib/useFavorites";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <main className="px-4 pb-28 pt-14">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/catalogue"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9ccb8] bg-[#fbf8f1] text-[#2b241d]"
          aria-label="Retour au catalogue"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border ${
              favorite
                ? "border-[#1b1712] bg-[#1b1712] text-[#d8c08a]"
                : "border-[#d9ccb8] bg-[#fbf8f1] text-[#2b241d]"
            }`}
            aria-label={
              favorite
                ? "Retirer le produit des favoris"
                : "Ajouter le produit aux favoris"
            }
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9ccb8] bg-[#fbf8f1] text-[#2b241d]">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-[#d8cab2] bg-[#fbf8f1]">
        <Image
          src={activeImage}
          alt={product.name}
          width={800}
          height={900}
          className="h-72 w-full object-cover"
        />
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {product.images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-xl border ${
              activeImage === image ? "border-[#b99f68]" : "border-[#d8cab2]"
            }`}
          >
            <Image
              src={image}
              alt={product.name}
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          </button>
        ))}
      </div>

      <section className="mt-4 rounded-[24px] border border-[#d8cab2] bg-[#fbf8f1] p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-[#7f6a47]">{product.brand}</p>
            <h1 className="text-xl font-semibold text-[#1d1813]">{product.name}</h1>
          </div>
          <p className="text-lg font-semibold text-[#1d1813]">{product.price}€</p>
        </div>

        <p className="mt-3 text-sm text-[#4b3f32]">{product.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="inline-flex min-w-10 items-center justify-center rounded-full border border-[#d8cab2] bg-white px-3 py-1 text-xs font-semibold text-[#2f261b]"
            >
              {size}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#6f6250]">
          <p className="rounded-xl bg-[#f3ebdc] px-3 py-2">Categorie: {product.category}</p>
          <p className="rounded-xl bg-[#f3ebdc] px-3 py-2">Saison: {product.season}</p>
        </div>
      </section>
    </main>
  );
}
