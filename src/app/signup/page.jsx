
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { getAuthErrorMessage } from "@/lib/auth-error";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.password) {
      const validationMessage = "নাম, ইমেইল ও পাসওয়ার্ড পূরণ করুন।";
      setMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    if (form.password.length < 8) {
      const validationMessage =
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password: form.password,
      });

      if (result.error) {
        const errorMessage = getAuthErrorMessage(
          result.error,
          "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      setSuccess(true);
      setMessage("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।");

      setForm({
        name: "",
        email: "",
        password: "",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error, "আবার চেষ্টা করুন।");
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mb-6 text-gray-600">
          Sign up to get started with BazarDor.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {message && (
            <p
              role="status"
              aria-live="polite"
              className={
                success
                  ? "text-sm text-green-700"
                  : "text-sm text-red-600"
              }
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <SocialAuthButtons />

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
