
import ProductCard from "./ProductCard";

function getChange(product) {
  if (!product.yesterday || product.yesterday <= 0) {
    return 0;
  }

  return (
    ((product.today - product.yesterday) /
      product.yesterday) *
    100
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductSections({ products }) {
  const increased = products
    .filter((product) => getChange(product) > 0)
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);

  const decreased = products
    .filter((product) => getChange(product) < 0)
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl space-y-20 px-4 py-16">
      <section>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          আজ দাম বেড়েছে ▲
        </h2>
        <p className="mb-8 text-gray-500">
          যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে
        </p>
        <ProductGrid products={increased} />
      </section>

      <section>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          আজ দাম কমেছে ▼
        </h2>
        <p className="mb-8 text-gray-500">
          যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে
        </p>
        <ProductGrid products={decreased} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-8">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          সব পণ্য
        </h2>
        <p className="mb-8 text-gray-500">
          প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর
        </p>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
