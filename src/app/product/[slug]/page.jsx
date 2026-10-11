
import { Suspense } from "react";

async function CategoryContent({ params }) {
  const { slug } = await params;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-green-700">
        Category Page Working!
      </h1>
      <p className="mt-4">Category: {slug}</p>
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
