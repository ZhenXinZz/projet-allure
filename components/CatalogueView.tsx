"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ShoppingBag, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PromoCarousel from "@/components/PromoCarousel";
import { brands, categories, products, seasons, styles } from "@/lib/products";
import { useFavorites } from "@/lib/useFavorites";
import { useCart } from "@/lib/useCart";

const priceRanges = [
  { id: "all", label: "Tous les prix", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "low", label: "Moins de 50€", min: 0, max: 49 },
  { id: "mid", label: "50€ - 90€", min: 50, max: 90 },
  { id: "high", label: "Plus de 90€", min: 91, max: Number.POSITIVE_INFINITY },
] as const;

type CatalogueViewProps = {
  showPromo: boolean;
};

export default function CatalogueView({ showPromo }: CatalogueViewProps) {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    (typeof priceRanges)[number]["id"]
  >("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { itemCount } = useCart();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const currentPriceRange =
      priceRanges.find((item) => item.id === selectedPriceRange) ?? priceRanges[0];

    return products.filter((product) => {
      const inBrand =
        selectedBrand === "all" || product.brandId.toLowerCase() === selectedBrand;
      const inCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const inSeason = selectedSeason === "all" || product.season === selectedSeason;
      const inStyle = selectedStyle === "all" || product.style === selectedStyle;
      const inPrice =
        product.price >= currentPriceRange.min &&
        product.price <= currentPriceRange.max;
      const inQuery =
        normalizedQuery.length === 0 ||
        `${product.brand} ${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedQuery);

      return inBrand && inCategory && inSeason && inStyle && inPrice && inQuery;
    });
  }, [
    query,
    selectedBrand,
    selectedCategory,
    selectedSeason,
    selectedStyle,
    selectedPriceRange,
  ]);

  function resetFilters() {
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSelectedSeason("all");
    setSelectedStyle("all");
    setSelectedPriceRange("all");
  }

  return (
    <main className="px-3 pb-[7.2rem] pt-8">
      <div className="sticky top-0 z-40 -mx-3 bg-[#f6f1e7] px-3 pb-2">
        <div className="mb-2.5 flex items-center gap-1.5">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full border border-[#d8cab2] bg-[#fbf8f1] px-3 text-[#8d806d]">
            <Search size={16} />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher des articles..."
              className="w-full bg-transparent text-[0.85rem] text-[#352b20] outline-none"
            />

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d8cab2] bg-[#efe5cf] text-[#2b241d]"
              aria-label={showFilters ? "Masquer les filtres" : "Afficher les filtres"}
            >
              {showFilters ? <X size={14} /> : <SlidersHorizontal size={14} />}
            </button>
          </div>

          <Link
            href="/panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cab2] bg-[#fbf8f1] text-[#2b241d]"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={16} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1b1712] px-1 text-[10px] font-semibold text-[#f6f1e7]">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setSelectedBrand("all")}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold tracking-wide ${
              selectedBrand === "all"
                ? "border-[#bfa16a] bg-[#f0e1c1] text-[#2f2519]"
                : "border-[#d8cab2] bg-[#fbf8f1] text-[#3b3127]"
            }`}
          >
            Toutes
          </button>
          {brands.map((brand) => (
            <button
              type="button"
              key={brand.id}
              onClick={() => setSelectedBrand(brand.id)}
              className={`shrink-0 rounded-full border p-1 ${
                selectedBrand === brand.id
                  ? "border-[#bfa16a] bg-[#f0e1c1]"
                  : "border-[#d8cab2] bg-[#fbf8f1]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image src={brand.logo} alt={brand.label} width={30} height={30} />
              </div>
            </button>
          ))}
        </div>

        {showFilters ? (
          <section className="mt-2 rounded-[20px] border border-[#d7cab2] bg-[#fbf8f1] p-3 shadow-[0_10px_22px_rgba(24,19,14,0.12)]">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[0.76rem] font-semibold text-[#2d241a]">Filtres</h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[0.68rem] font-semibold text-[#9f8657]"
              >
                Reinitialiser
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="text-[0.68rem] text-[#6f6250]">
                Categorie
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-[#d8cab2] bg-white px-2 text-[0.72rem] text-[#2f261b] outline-none"
                >
                  <option value="all">Toutes</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-[0.68rem] text-[#6f6250]">
                Style
                <select
                  value={selectedStyle}
                  onChange={(event) => setSelectedStyle(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-[#d8cab2] bg-white px-2 text-[0.72rem] text-[#2f261b] outline-none"
                >
                  <option value="all">Tous</option>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-[0.68rem] text-[#6f6250]">
                Saison
                <select
                  value={selectedSeason}
                  onChange={(event) => setSelectedSeason(event.target.value)}
                  className="mt-1 h-8 w-full rounded-lg border border-[#d8cab2] bg-white px-2 text-[0.72rem] text-[#2f261b] outline-none"
                >
                  <option value="all">Toutes</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[0.68rem] text-[#6f6250]">
                Prix
                <select
                  value={selectedPriceRange}
                  onChange={(event) =>
                    setSelectedPriceRange(
                      event.target.value as (typeof priceRanges)[number]["id"]
                    )
                  }
                  className="mt-1 h-8 w-full rounded-lg border border-[#d8cab2] bg-white px-2 text-[0.72rem] text-[#2f261b] outline-none"
                >
                  {priceRanges.map((priceRange) => (
                    <option key={priceRange.id} value={priceRange.id}>
                      {priceRange.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        ) : null}
      </div>

      <section>
        {showPromo && !showFilters ? <PromoCarousel /> : null}

        <div className="mb-2 flex items-center">
          <h2 className="whitespace-nowrap text-[1.05rem] font-semibold uppercase tracking-wide text-[#1e1a15]">
            Recommandes pour vous
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[22px] border border-[#d8cab2] bg-[#fbf8f1] p-4 text-sm text-[#6a5c49]">
            Aucun resultat pour cette recherche. Modifiez les filtres ou
            reinitialisez-les.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
