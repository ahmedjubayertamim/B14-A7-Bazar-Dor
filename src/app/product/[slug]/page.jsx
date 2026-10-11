
import { Suspense } from "react";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import CategoryProducts from "./CategoryProducts";

function EmptyCategory() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
      <h2 className="text-6xl font-bold text-green-700">
        404
      </h2>

      <h3 className="mt-5 text-2xl font-bold text-gray-900">
        ক্যাটাগরি খুঁজে পাওয়া যায়নি
      </h3>

      <p className="mt-3 text-gray-500">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="mt-7 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <EmptyCategory />
        </div>
      </main>
    );
  }

  const category = categoryProducts[0];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/"
          className="mb-8 inline-block font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <div className="mb-10 rounded-2xl bg-green-50 p-6 md:p-10">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm">
              {category.categoryIcon}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-green-700">
                পণ্যের ক্যাটাগরি
              </p>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {category.categoryNameBn}
              </h1>

              <p className="mt-2 text-gray-600">
                {category.categoryNameBn} বিভাগের
                সর্বশেষ বাজারদর ও মূল্য পরিবর্তন দেখুন।
              </p>
            </div>
          </div>
        </div>

        <CategoryProducts products={categoryProducts} />
      </div>
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl animate-pulse px-4 py-12">
          <div className="mb-10 h-40 rounded-2xl bg-gray-200" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-80 rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
