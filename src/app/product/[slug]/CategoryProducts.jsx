
"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

function toNumber(value) {
  if (typeof value === "number") return value;

  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const normalized = String(value ?? "")
    .replace(/[০-৯]/g, (digit) =>
      englishDigits[banglaDigits.indexOf(digit)]
    )
    .replace(/[,৳\s]/g, "");

  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

export default function CategoryProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortOrder === "low") {
      return items.sort(
        (a, b) => toNumber(a.today) - toNumber(b.today)
      );
    }

    if (sortOrder === "high") {
      return items.sort(
        (a, b) => toNumber(b.today) - toNumber(a.today)
      );
    }

    return items;
  }, [products, sortOrder]);

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-gray-600">
          মোট পণ্য:{" "}
          <span className="font-semibold text-green-700">
            {new Intl.NumberFormat("bn-BD").format(
              products.length
            )}
          </span>
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="category-sort"
            className="font-medium text-gray-700"
          >
            সাজান:
          </label>

          <div className="relative">
            <select
              id="category-sort"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value)
              }
              className="appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option value="default">
                ডিফল্ট
              </option>

              <option value="low">
                দাম: কম থেকে বেশি
              </option>

              <option value="high">
                দাম: বেশি থেকে কম
              </option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
