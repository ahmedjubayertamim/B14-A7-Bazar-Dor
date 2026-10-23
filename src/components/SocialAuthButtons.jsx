"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { getAuthErrorMessage } from "@/lib/auth-error";

const providers = [
  {
    id: "google",
    label: "Google দিয়ে চালিয়ে যান",
  },
  {
    id: "github",
    label: "GitHub দিয়ে চালিয়ে যান",
  },
];

export default function SocialAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState("");
  const [configuredProviders, setConfiguredProviders] = useState(null);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/providers", { credentials: "same-origin" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Provider configuration request failed");
        }
        return response.json();
      })
      .then((providerStatus) => {
        if (active) setConfiguredProviders(providerStatus);
      })
      .catch(() => {
        if (active) setConfiguredProviders({});
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSocialSignIn(provider) {
    setLoadingProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(
          getAuthErrorMessage(result.error, "সামাজিক লগইন করা যায়নি।")
        );
        setLoadingProvider("");
        return;
      }
    } catch (error) {
      toast.error(
        getAuthErrorMessage(error, "সামাজিক লগইনের সময় সমস্যা হয়েছে।")
      );
      setLoadingProvider("");
    }
  }

  if (
    configuredProviders &&
    !providers.some((provider) => configuredProviders[provider.id])
  ) {
    return (
      <p className="text-center text-sm text-gray-500">
        Google ও GitHub লগইন এখনো কনফিগার করা হয়নি।
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        <span>অথবা</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      {providers.map((provider) => {
        const configured = Boolean(configuredProviders?.[provider.id]);

        return (
        <button
          key={provider.id}
          type="button"
          disabled={
            !configured ||
            Boolean(loadingProvider) ||
            configuredProviders === null
          }
          onClick={() => handleSocialSignIn(provider.id)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:border-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-disabled={!configured}
        >
          {loadingProvider === provider.id
            ? "সংযোগ করা হচ্ছে..."
            : configured
              ? provider.label
              : `${provider.id === "google" ? "Google" : "GitHub"} লগইন কনফিগার করা হয়নি`}
        </button>
        );
      })}
    </div>
  );
}
