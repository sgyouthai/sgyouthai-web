"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/providers";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const signUpMutation = api.auth.signUp.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      router.push("/auth/confirm");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Check your email!
        </h3>

        <p className="text-green-600">
          We&apos;ve sent a confirmation link to {email}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          Click the link in the email to confirm your account.
        </p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUpMutation.mutate({ email, password, fullName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={signUpMutation.isPending}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {signUpMutation.isPending ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}
