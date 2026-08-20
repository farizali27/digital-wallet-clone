"use server";

import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthState = {
  step: "SEND_OTP" | "VERIFY_OTP" | "SET_PASSWORD";
  phoneNumber?: string;
  error?: string;
};

export async function signupAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const reqHeaders = await headers();

  // Step 1: Send OTP to the phone number
  if (prevState.step === "SEND_OTP") {
    const phoneNumber = formData.get("phoneNumber") as string;
    if (!phoneNumber) {
      return { step: "SEND_OTP", error: "Phone number is required." };
    }

    try {
      await auth.api.sendPhoneNumberOTP({
        body: { phoneNumber },
        headers: reqHeaders,
      });

      return { step: "VERIFY_OTP", phoneNumber };
    } catch (err: any) {
      return {
        step: "SEND_OTP",
        error: err.body?.message || err.message || "Failed to send OTP.",
      };
    }
  }

  // Step 2: Verify the OTP (authenticates and creates user session)
  if (prevState.step === "VERIFY_OTP") {
    const code = formData.get("code") as string;
    const phoneNumber = prevState.phoneNumber;

    if (!code || !phoneNumber) {
      return { ...prevState, error: "OTP code is required." };
    }

    try {
      await auth.api.verifyPhoneNumber({
        body: { phoneNumber, code },
        headers: reqHeaders,
      });

      return { step: "SET_PASSWORD", phoneNumber };
    } catch (err: any) {
      return {
        ...prevState,
        error: err.body?.message || err.message || "Invalid OTP code.",
      };
    }
  }

  // Step 3: Set user password using session from step 2
  if (prevState.step === "SET_PASSWORD") {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || newPassword.length < 8) {
      return { ...prevState, error: "Password must be at least 8 characters." };
    }

    if (newPassword !== confirmPassword) {
      return { ...prevState, error: "Passwords do not match." };
    }

    try {
      await auth.api.setPassword({
        body: { newPassword },
        headers: reqHeaders,
      });
    } catch (err: any) {
      return {
        ...prevState,
        error: err.body?.message || err.message || "Failed to set password.",
      };
    }

    redirect("/dashboard");
  }

  return prevState;
}