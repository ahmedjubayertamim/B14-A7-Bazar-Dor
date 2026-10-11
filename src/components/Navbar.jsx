
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";

const formatBn = (value) =>
  new Intl.NumberFormat("bn-BD").format(value);

export default function Navbar({ products = [] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  const categories = Array.from(
    new Map(
      products.map((item) => [
        item.category,
        {
          slug: item.category,
          name: item.categoryNameBn,
          icon: item.categoryIcon,
        },
      ])
    ).values()
  ).filter((item) => item.slug);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-700">
              <ShoppingBasket size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-green-800">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500">
                {date || "আজকের বাজার দর"}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/signin"
              className="rounded-lg border border-green-600 px-5 py-2 text-green-700 hover:bg-green-50"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
            >
              সাইন আপ
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-gray-700 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav
          className={`${menuOpen ? "block" : "hidden"} border-t border-gray-100 py-3 md:block`}
        >
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/"
                  ? "bg-green-700 text-white"
                  : "text-gray-600 hover:bg-green-50"
              }`}
            >
              সব পণ্য
            </Link>

            {categories.map((category) => {
              const href = `/category/${category.slug}`;

              return (
                <Link
                  key={category.slug}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    pathname === href
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-green-50"
                  }`}
                >
                  {category.icon} {category.name}
                </Link>
              );
            })}

            <div className="flex gap-2 pt-3 md:hidden">
              <Link href="/signin" className="rounded-lg border px-4 py-2">
                সাইন ইন
              </Link>
              <Link href="/signup" className="rounded-lg bg-green-700 px-4 py-2 text-white">
                সাইন আপ
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {products.length > 0 && (
        <div className="overflow-hidden bg-green-900 py-3 text-white">
          <div className="bazar-ticker flex w-max gap-10 whitespace-nowrap">
            {[...products, ...products].map((product, index) => {
              const change =
                product.yesterday > 0
                  ? ((product.today - product.yesterday) /
                      product.yesterday) *
                    100
                  : 0;

              return (
                <span key={`${product.id}-${index}`} className="text-sm">
                  {product.image} {product.nameBn}{" "}
                  {formatBn(product.today)} টাকা/{product.unit}{" "}
                  <span
                    className={
                      change > 0
                        ? "text-yellow-300"
                        : change < 0
                        ? "text-red-300"
                        : "text-gray-300"
                    }
                  >
                    {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
                    {formatBn(Math.abs(change).toFixed(1))}%
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
