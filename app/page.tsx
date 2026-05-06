import BottomNav from "@/components/BottomNav";
import CatalogueView from "@/components/CatalogueView";

export default function HomePage() {
  return (
    <>
      <CatalogueView showPromo />

      <BottomNav />
    </>
  );
}
