"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signupAction, AuthState } from "../../../actions/auth";

const initialState: AuthState = { step: "SEND_OTP" };

const STEPS = ["SEND_OTP", "VERIFY_OTP", "SET_PASSWORD"] as const;

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState
  );

  const stepIndex = STEPS.indexOf(state.step);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign up with your phone number
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {STEPS.map((step, i) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all ${
                  i === stepIndex
                    ? "w-8 bg-slate-900"
                    : i < stepIndex
                    ? "w-8 bg-slate-400"
                    : "w-8 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Error */}
          {state.error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          )}

          {/* Step 1: Send OTP */}
          {state.step === "SEND_OTP" && (
            <form action={formAction} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-slate-900 text-white font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isPending ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {state.step === "VERIFY_OTP" && (
            <form action={formAction} className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Enter the code sent to{" "}
                <span className="font-medium text-slate-900">
                  {state.phoneNumber}
                </span>
              </p>

              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Verification code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  required
                  autoFocus
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-center text-lg tracking-[0.4em] text-slate-900 placeholder:text-slate-400 placeholder:tracking-[0.4em] outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-slate-900 text-white font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isPending ? "Verifying..." : "Verify code"}
              </button>
            </form>
          )}

          {/* Step 3: Set Password */}
          {state.step === "SET_PASSWORD" && (
            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                <svg
                  className="w-4 h-4 text-emerald-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm text-emerald-700">
                  Phone verified. Set a password to finish.
                </p>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  New password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoFocus
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-slate-900 text-white font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isPending ? "Saving..." : "Set password & finish"}
              </button>
            </form>
          )}
        </div>

        {/* Link to sign in */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}