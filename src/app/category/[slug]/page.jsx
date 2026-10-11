
import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import CategoryProducts from "./CategoryProducts";
import Loading from "./loading";

// Invalid or empty category
function EmptyCategory() {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
      <h2 className="text-7xl font-bold text-green-700">
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

// Fetch and display category data
async function CategoryContent({ params }) {
  const { slug } = await params;

  const products = await getProducts();

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  // Handle invalid or empty category
  if (categoryProducts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <EmptyCategory />
        </div>
      </main>
    );
  }

  // Category information from API data
  const category = categoryProducts[0];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">

        {/* Back to Home */}
        <Link
          href="/"
          className="mb-8 inline-flex font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Category Header */}
        <section className="mb-10 rounded-2xl bg-green-50 p-6 md:p-10">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">

            {/* Category Icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm">
              {category.categoryIcon}
            </div>

            {/* Category Details */}
            <div>
              <p className="mb-2 text-sm font-medium text-green-700">
                পণ্যের ক্যাটাগরি
              </p>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {category.categoryNameBn}
              </h1>

              <p className="mt-3 text-gray-600">
                {category.categoryNameBn} বিভাগের
                সর্বশেষ বাজারদর ও মূল্য পরিবর্তন দেখুন।
              </p>
            </div>
          </div>
        </section>

        {/* Product Cards and Sorting */}
        <section>
          <CategoryProducts products={categoryProducts} />
        </section>

      </div>
    </main>
  );
}

// Main Category Page
// params and API fetching are inside Suspense
export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
