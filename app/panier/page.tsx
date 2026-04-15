"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useFavorites } from "@/lib/useFavorites";

export default function PanierPage() {
  const { ready, favoriteSet, toggleFavorite } = useFavorites();
  const favoriteProducts = products.filter((product) => favoriteSet.has(product.id));

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
          <h1 className="text-xl font-semibold text-[#1b1712]">Favoris</h1>
          <p className="text-sm text-[#7a6d5b]">
            Vos pièces enregistrées pour plus tard.
          </p>
        </div>

        {!ready ? (
          <div className="rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1] p-4 text-sm text-[#6a5c49]">
            Chargement de vos favoris...
          </div>
        ) : favoriteProducts.length === 0 ? (
          <div className="rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1] p-4 text-sm text-[#6a5c49]">
            Aucun favori pour l&apos;instant. Ajoutez des articles depuis le{" "}
            <Link href="/catalogue" className="font-semibold text-[#8f7244]">
              catalogue
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
