
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const formatBn = (value) =>
  new Intl.NumberFormat("bn-BD").format(value);

const unitNames = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

function buildTickerProducts(products) {
  if (products.length === 0) {
    return [];
  }

  const minimumItemsForContinuousLoop = 12;
  const repetitions = Math.max(
    1,
    Math.ceil(minimumItemsForContinuousLoop / products.length)
  );

  return Array.from({ length: repetitions }, () => products).flat();
}

export default function Navbar({ products = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [date] = useState(() =>
    new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date())
  );

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
  const tickerProducts = buildTickerProducts(products);

  async function handleLogout() {
    const result = await authClient.signOut();

    if (result.error) {
      toast.error(result.error.message || "লগআউট করা যায়নি।");
      return;
    }

    toast.success("সফলভাবে লগআউট হয়েছে।");
    setMenuOpen(false);
    router.refresh();
  }

  function renderAuthControls(isMobile = false) {
    if (isPending) {
      return (
        <div
          className={`h-10 animate-pulse rounded-lg bg-gray-100 ${
            isMobile ? "w-full" : "w-44"
          }`}
          aria-label="অথেন্টিকেশন লোড হচ্ছে"
        />
      );
    }

    if (session?.user) {
      return (
        <div
          className={`flex ${
            isMobile
              ? "w-full flex-col gap-2"
              : "items-center gap-3"
          }`}
        >
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg border border-green-600 px-4 py-2 text-green-700 hover:bg-green-50"
          >
            {session.user.name || "প্রোফাইল"}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            সাইন আউট
          </button>
        </div>
      );
    }

    return (
      <div
        className={`flex ${
          isMobile ? "w-full gap-2" : "items-center gap-3"
        }`}
      >
        <Link
          href="/signin"
          onClick={() => setMenuOpen(false)}
          className="rounded-lg border border-green-600 px-5 py-2 text-green-700 hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          onClick={() => setMenuOpen(false)}
          className="rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

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
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            {renderAuthControls()}
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
          <div className="overflow-x-auto overscroll-x-contain">
            <div className="flex min-w-max gap-2 md:flex-wrap md:items-center">
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
            </div>
          </div>

          <div className="pt-3 md:hidden">
            {renderAuthControls(true)}
          </div>
        </nav>
      </div>

      {tickerProducts.length > 0 && (
        <div className="overflow-hidden bg-green-900 py-3 text-white">
          <div className="bazar-ticker" aria-label="পণ্যের বর্তমান বাজারদর">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="bazar-ticker-group"
                aria-hidden={group === 1}
              >
                {tickerProducts.map((product, index) => {
                  const today = Number(product.today);
                  const yesterday = Number(product.yesterday);
                  const hasPrice = Number.isFinite(today);
                  const hasChange =
                    Number.isFinite(yesterday) && yesterday > 0 && hasPrice;
                  const change = hasChange
                    ? ((today - yesterday) / yesterday) * 100
                    : null;
                  const unit = unitNames[product.unit] || product.unit;

                  return (
                    <span
                      key={`${group}-${product.id || index}`}
                      className="text-sm"
                    >
                      {product.image} {product.nameBn}
                      {hasPrice && (
                        <>
                          {" "}
                          {formatBn(today)} টাকা{unit ? `/${unit}` : ""}
                        </>
                      )}
                      {hasChange && (
                        <span
                          className={
                            change > 0
                              ? "text-yellow-300"
                              : change < 0
                              ? "text-red-300"
                              : "text-gray-300"
                          }
                        >
                          {" "}
                          {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
                          {formatBn(Math.abs(change).toFixed(1))}%
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
