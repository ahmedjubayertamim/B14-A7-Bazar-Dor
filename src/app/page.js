
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";

async function MarketContent() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            বাজারের তথ্য পাওয়া যায়নি
          </h1>
          <p className="mt-3 text-gray-600">
            কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

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
