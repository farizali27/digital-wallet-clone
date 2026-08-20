import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@repo/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, ctx) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[AUTH OTP] To: ${phoneNumber} | Code: ${code}`);
          return;
        }

        // Add production SMS provider here
      },
      sendPasswordResetOTP: async ({ phoneNumber, code }, ctx) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[AUTH RESET OTP] To: ${phoneNumber} | Code: ${code}`);
          return;
        }
        // production SMS provider
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`
        },
        //optionally, you can also pass `getTempName` function to generate a temporary name for the user
        getTempName: (phoneNumber) => {
          return phoneNumber //by default, it will use the phone number as the name
        }
      }
    }),
    nextCookies()
  ],
});