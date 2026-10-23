"use client";

export default function GlobalError({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          বাজারের তথ্য লোড করা যায়নি
        </h1>
        <p className="mt-3 text-gray-600">
          নেটওয়ার্ক বা API সমস্যার কারণে তথ্য পাওয়া যায়নি।
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-medium text-white hover:bg-green-800"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
