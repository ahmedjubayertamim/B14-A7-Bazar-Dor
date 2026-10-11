
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#f4fbf5] py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            🌿 প্রতিদিনের বাজার দর
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            বাজারের সঠিক দাম
            <br />
            <span className="text-green-700">
              জানুন এক নজরে
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ প্রতিদিনের
            নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর
            সহজেই দেখে নিন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex items-center rounded-xl bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন →
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="/images/bazar-hero.png"
            alt="Bazar Dor grocery illustration"
            width={520}
            height={440}
            priority
            className="h-auto w-full max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
