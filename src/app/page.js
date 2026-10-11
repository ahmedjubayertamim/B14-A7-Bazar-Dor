
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { getProducts } from "@/lib/api";

async function MarketContent() {
  try {
    const products = await getProducts();

    return (
      <>
        <Navbar products={products} />

        <main className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">
            আজকের বাজার দর
          </h1>

          <p className="mt-3 text-gray-600">
            প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন।
          </p>

          <p className="mt-6 text-green-700">
            মোট পণ্য: {new Intl.NumberFormat("bn-BD").format(products.length)}
          </p>
        </main>
      </>
    );
  } catch {
    return (
      <main className="p-8 text-red-600">
        পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।
      </main>
    );
  }
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8">লোড হচ্ছে...</div>}>
      <MarketContent />
    </Suspense>
  );
}
