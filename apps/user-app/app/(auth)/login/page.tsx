"use client";
import { useActionState } from "react";
import { loginAction, LoginState } from "../../../actions/auth";
import {
  AuthCard
} from "../../../components/auth";
import {
  FormError,
  FormField,
  SubmitButton,
} from "../../../components/ui";
import Link from "next/link";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in with your phone number"
      footerText="Don't have an account?"
      footerLinkHref="/signup"
      footerLinkText="Sign up"
    >
      <FormError message={state.error} />

      <form action={formAction} className="flex flex-col gap-4">
        <FormField
          label="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="+1234567890"
          required
          defaultValue={state.phoneNumber}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
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

        <SubmitButton isPending={isPending} pendingLabel="Signing in...">
          Sign in
        </SubmitButton>
      </form>
    </AuthCard>
  );
}