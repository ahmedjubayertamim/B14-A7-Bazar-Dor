
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 h-40 animate-pulse rounded-2xl bg-gray-200" />

        <div className="mb-8 flex items-center justify-between">
          <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-12 w-48 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-5 h-28 rounded-xl bg-gray-200" />
              <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
              <div className="mb-6 h-4 w-1/2 rounded bg-gray-200" />
              <div className="border-t border-gray-100 pt-4">
                <div className="mb-3 h-4 w-24 rounded bg-gray-200" />
                <div className="h-8 w-32 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
