"use client";
import { useActionState } from "react";
import {
  forgotPasswordAction,
  ForgotPasswordState,
} from "../../../actions/auth";
import {
  AuthCard,
  StepIndicator
} from "../../../components/auth";
import {
  FormError,
  FormField,
  SubmitButton,
} from "../../../components/ui";

const initialState: ForgotPasswordState = { step: "SEND_OTP" };
const STEPS = ["SEND_OTP", "RESET_PASSWORD"] as const;

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);
  const stepIndex = STEPS.indexOf(state.step);

  const subtitle =
    state.step === "SEND_OTP"
      ? "Enter your phone number to get a reset code"
      : "Enter the code and your new password";

  return (
    <AuthCard
      title="Reset your password"
      subtitle={subtitle}
      footerText="Remembered your password?"
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
            Send reset code
          </SubmitButton>
        </form>
      )}

      {state.step === "RESET_PASSWORD" && (
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="phoneNumber" value={state.phoneNumber} />

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
          <FormField
            label="New password"
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <FormField
            label="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton isPending={isPending} pendingLabel="Resetting...">
            Reset password
          </SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}