"use client";
import { useActionState } from "react";
import { signupAction, SignUpState } from "../../../actions/auth";
import {
  AuthCard,
  StepIndicator,
  SuccessBanner
} from "../../../components/auth";
import {
  FormError,
  FormField,
  SubmitButton,
} from "../../../components/ui";

const initialState: SignUpState = { step: "SEND_OTP" };
const STEPS = ["SEND_OTP", "VERIFY_OTP", "SET_PASSWORD"] as const;

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, initialState);
  const stepIndex = STEPS.indexOf(state.step);

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up with your phone number"
      footerText="Already have an account?"
      footerLinkHref="/login"
      footerLinkText="Sign in"
    >
      <StepIndicator totalSteps={STEPS.length} currentIndex={stepIndex} />
      <FormError message={state.error} />

      {state.step === "SEND_OTP" && (
        <form action={formAction} className="flex flex-col gap-4">
          <FormField
            label="Phone number"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="+1234567890"
            required
          />
          <SubmitButton isPending={isPending} pendingLabel="Sending...">
            Send OTP
          </SubmitButton>
        </form>
      )}

      {state.step === "VERIFY_OTP" && (
        <form action={formAction} className="flex flex-col gap-4">
          <p className="text-sm text-slate-600">
            Enter the code sent to{" "}
            <span className="font-medium text-slate-900">{state.phoneNumber}</span>
          </p>
          <FormField
            label="Verification code"
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            placeholder="123456"
            required
            autoFocus
            variant="otp"
          />
          <SubmitButton isPending={isPending} pendingLabel="Verifying...">
            Verify code
          </SubmitButton>
        </form>
      )}

      {state.step === "SET_PASSWORD" && (
        <form action={formAction} className="flex flex-col gap-4">
          <SuccessBanner message="Phone verified. Set a password to finish." />
          <FormField
            label="New password"
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            required
            autoFocus
          />
          <FormField
            label="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton isPending={isPending} pendingLabel="Saving...">
            Set password & finish
          </SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}