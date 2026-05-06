import BottomNav from "@/components/BottomNav";
import CatalogueView from "@/components/CatalogueView";

export default function CataloguePage() {
  return (
    <>
      <CatalogueView showPromo={false} />

      <BottomNav />
    </>
  );
}
