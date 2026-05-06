"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getSimilarProducts, type Product } from "@/lib/products";
import { useCart } from "@/lib/useCart";
import { useFavorites } from "@/lib/useFavorites";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [addedToCart, setAddedToCart] = useState(false);
  const [openSection, setOpenSection] = useState<"details" | "avatar" | null>(
    "details"
  );
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem, itemCount } = useCart();
  const favorite = isFavorite(product.id);
  const similarProducts = getSimilarProducts(product);

  function toggleSection(section: "details" | "avatar") {
    setOpenSection((current) => (current === section ? null : section));
  }

  function handleAddToCart() {
    if (!selectedSize) {
      return;
    }
    addItem(product.id, selectedSize);
    setAddedToCart(true);
    window.setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
  }

  return (
    <main className="px-4 pb-28 pt-12">
      <div className="mb-3 flex items-center justify-between">
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
          <Link
            href="/panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d9ccb8] bg-[#fbf8f1] text-[#2b241d]"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1b1712] px-1 text-[10px] font-semibold text-[#f6f1e7]">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1]">
        <Image
          src={activeImage}
          alt={product.name}
          width={800}
          height={900}
          className="h-72 w-full object-cover object-top"
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

      <section className="mt-4 rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1] p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8f7244]">
              {product.brand}
            </p>
            <h1 className="mt-1 text-[1.15rem] font-semibold leading-snug text-[#1d1813]">
              {product.name}
            </h1>
          </div>
          <p className="whitespace-nowrap text-[1.05rem] font-semibold text-[#1d1813]">
            {product.price}€
          </p>
        </div>

        <p className="mt-2 text-[0.92rem] leading-6 text-[#4b3f32]">
          {product.description}
        </p>

        <div className="mt-4 rounded-[18px] border border-[#eadfcb] bg-[#f7f0e3] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f7244]">
                Informations
              </p>
              <p className="mt-1 text-[0.9rem] leading-5 text-[#5f4f3d]">
                Choisissez votre taille avant d&apos;ajouter l&apos;article.
              </p>
            </div>
            <p className="rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-semibold text-[#1d1813]">
              {product.price}€
            </p>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6250]">
                Taille
              </p>
              <span className="text-[0.78rem] text-[#8f7244]">Guide des tailles</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`inline-flex min-w-11 items-center justify-center rounded-full border px-3 py-2 text-[0.8rem] font-semibold ${
                    selectedSize === size
                      ? "border-[#1b1712] bg-[#1b1712] text-[#f6f1e7]"
                      : "border-[#d8cab2] bg-white text-[#2f261b]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="flex-1 rounded-full bg-[#12703a] px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[#f6f1e7] disabled:cursor-not-allowed disabled:bg-[#8cb69b]"
            >
              {addedToCart ? "Ajoute au panier" : "Ajouter au panier"}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                favorite
                  ? "border-[#1b1712] bg-[#1b1712] text-[#d8c08a]"
                  : "border-[#d9ccb8] bg-white text-[#2b241d]"
              }`}
              aria-label={
                favorite
                  ? "Retirer le produit des favoris"
                  : "Ajouter le produit aux favoris"
              }
            >
              <Heart size={18} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>

          {addedToCart ? (
            <p className="mt-3 text-[0.8rem] font-medium text-[#12703a]">
              Article ajoute au panier en taille {selectedSize}.
            </p>
          ) : null}
        </div>

        <div className="mt-5 space-y-2">
          <section className="overflow-hidden rounded-[18px] border border-[#e3d5bf]">
            <button
              type="button"
              onClick={() => toggleSection("details")}
              className="flex w-full items-center justify-between bg-[#fffaf2] px-4 py-3 text-left"
            >
              <span className="text-[0.92rem] font-semibold text-[#1d1813]">
                Details du produit
              </span>
              {openSection === "details" ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openSection === "details" ? (
              <div className="space-y-2 border-t border-[#eadfcb] bg-white px-4 py-4 text-[0.9rem] leading-6 text-[#4b3f32]">
                <p>{product.description}</p>
                <p>Taille conseillee actuellement: {selectedSize || product.size}.</p>
                <p>Style: {product.style}.</p>
              </div>
            ) : null}
          </section>

          <section className="overflow-hidden rounded-[18px] border border-[#e3d5bf]">
            <button
              type="button"
              onClick={() => toggleSection("avatar")}
              className="flex w-full items-center justify-between bg-[#fffaf2] px-4 py-3 text-left"
            >
              <span className="text-[0.92rem] font-semibold text-[#1d1813]">
                Essayer sur mon avatar
              </span>
              {openSection === "avatar" ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {openSection === "avatar" ? (
              <div className="border-t border-[#eadfcb] bg-white px-4 py-4">
                <div className="rounded-[18px] bg-[linear-gradient(135deg,#f6ebcf_0%,#ead6a4_100%)] p-4 text-[#16120e] shadow-[0_12px_24px_rgba(22,18,14,0.12)]">
                  <p className="text-[0.88rem] font-semibold uppercase tracking-[0.12em] text-[#16120e]">
                    Visualisez ce produit sur votre avatar
                  </p>
                  <p className="mt-1 text-[0.88rem] leading-6 text-[#2f261b]">
                    Lancez l&apos;essayage virtuel pour voir le rendu, verifier la
                    silhouette et ajuster la taille.
                  </p>
                  <Link
                    href="/essayage"
                    className="mt-3 inline-flex items-center rounded-full bg-white px-4 py-2 text-[0.82rem] font-semibold text-[#16120e] shadow-[0_6px_16px_rgba(22,18,14,0.12)]"
                  >
                    <Sparkles size={15} className="mr-2" />
                    Essayer sur mon avatar
                  </Link>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[0.92rem] font-semibold uppercase tracking-[0.12em] text-[#1e1a15]">
            Articles similaires
          </h2>
          <span className="text-[0.72rem] font-semibold text-[#9f8657]">
            Selection pour vous
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {similarProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              favorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
