export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl animate-pulse px-4">
        <div className="mb-8 h-6 w-40 rounded bg-gray-200" />
        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-48 w-full rounded-2xl bg-gray-200 md:w-56" />
            <div className="flex-1 space-y-4">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-10 w-2/3 rounded bg-gray-200" />
              <div className="h-5 w-full max-w-xl rounded bg-gray-200" />
              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-24 rounded-2xl bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-100 pt-8">
            <div className="mb-5 h-8 w-48 rounded bg-gray-200" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-32 rounded-2xl bg-gray-200" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
