
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";

async function MarketContent() {
  const products = await getProducts();

  return (
    <>
      <Navbar products={products} />
      <Hero />
      <ProductSections products={products} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen animate-pulse bg-gray-100 p-8">
          <p className="text-center text-gray-500">
            বাজারের তথ্য লোড হচ্ছে...
          </p>
        </div>
      }
    >
      <MarketContent />
    </Suspense>
  );
}
