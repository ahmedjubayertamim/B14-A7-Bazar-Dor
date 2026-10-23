import Link from "next/link";

const footerLinks = [
  { href: "/", label: "হোম" },
  { href: "/#সব-পণ্য", label: "সব পণ্য" },
  { href: "/signin", label: "সাইন ইন" },
  { href: "/signup", label: "সাইন আপ" },
  { href: "/account", label: "আমার প্রোফাইল" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-100 bg-green-950 text-green-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-green-200"
          >
            বাজার দর
          </Link>
          <p className="mt-3 max-w-md leading-7 text-green-100">
            নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ও বাজারভিত্তিক মূল্য এক নজরে
            দেখুন।
          </p>
        </div>

        <nav aria-label="ফুটার নেভিগেশন">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-green-200">
            দ্রুত লিংক
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-green-100 transition hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-green-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-green-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© ২০২৬ BazarDor. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </div>
    </footer>
  );
}
