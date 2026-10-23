"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AccountForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    if (trimmedName.length > 100) {
      toast.error("নাম ১০০ অক্ষরের মধ্যে হতে হবে।");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "তথ্য আপডেট করা যায়নি।"
        );
        return;
      }

      setName(trimmedName);
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch (error) {
      toast.error(
        error.message || "তথ্য আপডেট করার সময় সমস্যা হয়েছে।"
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    const result = await authClient.signOut();

    if (result.error) {
      toast.error(result.error.message || "লগআউট করা যায়নি।");
      return;
    }

    toast.success("সফলভাবে লগআউট হয়েছে।");
    router.push("/signin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="mb-6 text-gray-600">
          আপনার BazarDor অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
        </p>

        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <p>
              <strong className="text-gray-700">ইমেইল:</strong>{" "}
              <span className="text-gray-600">{user.email}</span>
            </p>
            <p className="text-sm text-gray-500">
              ইমেইল পরিবর্তনের সুবিধা বর্তমানে চালু নেই।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block font-medium text-gray-700"
              >
                নাম
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={100}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            সাইন আউট
          </button>
        </section>
      </div>
    </main>
  );
}
