"use client";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction, LoginState } from "../../../actions/auth";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in with your phone number
            </p>
          </div>

          {/* Error */}
          {state.error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          )}

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
                defaultValue={state.phoneNumber}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                {/* TODO: point this at your forgot-password flow */}
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
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
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Link to sign up */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-slate-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}