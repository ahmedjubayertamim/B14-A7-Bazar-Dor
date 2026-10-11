
import Link from "next/link";

const bnNumber = (number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(number);

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export default function ProductCard({ product }) {
  const { slug, nameBn, image, unit, today, yesterday } = product;

  const change =
    yesterday > 0
      ? ((today - yesterday) / yesterday) * 100
      : 0;

  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
    >
      <div className="mb-5 flex h-28 items-center justify-center rounded-xl bg-green-50 text-7xl">
        {image}
      </div>

      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700">
        {nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {unitNames[unit] || unit}
      </p>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="mb-2 text-sm text-gray-500">
          আজকের দাম
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {bnNumber(today)} টাকা
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              isUp
                ? "bg-green-100 text-green-700"
                : isDown
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {bnNumber(Math.abs(change))}%
          </span>
        </div>
      </div>
    </Link>
  );
}
