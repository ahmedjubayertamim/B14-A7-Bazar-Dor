
import { getProducts } from "@/lib/api";

export default async function Home() {
  try {
    const products = await getProducts();

    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          🛒 বাজার দর
        </h1>

        <h2 className="mb-4 text-xl font-semibold">
          API Test
        </h2>

        <pre className="overflow-auto rounded-lg bg-white p-5 text-sm shadow">
          {JSON.stringify(products, null, 2)}
        </pre>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          API Connection Failed
        </h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
