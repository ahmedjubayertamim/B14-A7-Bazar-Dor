import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AccountForm from "./AccountForm";

async function AccountContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return <AccountForm user={session.user} />;
}

function AccountLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl animate-pulse">
        <div className="mb-2 h-9 w-48 rounded bg-gray-200" />
        <div className="mb-6 h-5 w-80 rounded bg-gray-200" />
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 h-24 rounded-xl bg-gray-200" />
          <div className="mb-2 h-5 w-16 rounded bg-gray-200" />
          <div className="mb-5 h-12 rounded-lg bg-gray-200" />
          <div className="h-12 rounded-lg bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountLoading />}>
      <AccountContent />
    </Suspense>
  );
}
