import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct, getProducts } from "@/lib/api";

const bnNumber = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

async function getProductBySlug(slug) {
  const products = await getProducts();
  const summary = products.find((product) => product.slug === slug);

  if (!summary) {
    notFound();
  }

  return getProduct(summary.id);
}

function getMarketStats(markets) {
  const prices = markets.flatMap((market) => [
    Number(market.min),
    Number(market.max),
  ]);
  const validPrices = prices.filter(Number.isFinite);

  return {
    minimum: validPrices.length ? Math.min(...validPrices) : null,
    maximum: validPrices.length ? Math.max(...validPrices) : null,
    average: validPrices.length
      ? validPrices.reduce((total, price) => total + price, 0) /
        validPrices.length
      : null,
  };
}

async function ProductDetails({ slug }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const product = await getProductBySlug(slug);
  const markets = Array.isArray(product.markets) ? product.markets : [];
  const stats = getMarketStats(markets);
  const unit = unitNames[product.unit] || product.unit;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/"
          className="mb-8 inline-flex font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-2xl bg-green-50 text-8xl md:w-56">
              {product.image}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-gray-600">
                {markets.length > 0
                  ? `${bnNumber(markets.length)}টি বাজারের তথ্য অনুযায়ী প্রতি ${unit} এর বর্তমান বাজারদর।`
                  : `প্রতি ${unit} এর বর্তমান বাজারদর।`}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <PriceStat
                  label="সর্বনিম্ন দাম"
                  value={stats.minimum}
                />
                <PriceStat
                  label="সর্বোচ্চ দাম"
                  value={stats.maximum}
                />
                <PriceStat
                  label="গড় দাম (হিসাবকৃত)"
                  value={stats.average}
                />
              </div>
            </div>
          </div>

          <section className="mt-10 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">
              বাজারভিত্তিক দাম
            </h2>

            {markets.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                  <article
                    key={`${market.market}-${market.division}`}
                    className="rounded-2xl border border-gray-200 p-5"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {market.market}
                    </h3>
                    {market.division && (
                      <p className="mt-1 text-sm text-gray-500">
                        {market.division}
                      </p>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <PriceValue label="সর্বনিম্ন" value={market.min} />
                      <PriceValue label="সর্বোচ্চ" value={market.max} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}

function PriceStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-green-50 p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-green-800">
        {value === null ? "—" : `${bnNumber(value)} টাকা`}
      </p>
    </div>
  );
}

function PriceValue({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-gray-500">{label}</p>
      <p className="mt-1 font-semibold text-gray-900">
        {Number.isFinite(Number(value)) ? `${bnNumber(value)} টাকা` : "—"}
      </p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  return <ProductDetails slug={slug} />;
}
