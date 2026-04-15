import Link from "next/link";
import { getProductById } from "@/lib/products";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export default async function ProductDetailsPage(
  props: PageProps<"/catalogue/[id]">
) {
  const { id } = await props.params;
  const parsedId = Number(id);
  const product = getProductById(parsedId);

  if (!product) {
    return (
      <main className="px-4 pb-10 pt-14">
        <Link href="/catalogue" className="text-sm font-semibold text-[#8f7244]">
          Retour au catalogue
        </Link>
        <p className="mt-4 rounded-2xl border border-[#d8cab2] bg-[#fbf8f1] p-4 text-sm text-[#6a5c49]">
          Produit introuvable.
        </p>
      </main>
    );
  }

  return <ProductDetailsClient product={product} />;
}
