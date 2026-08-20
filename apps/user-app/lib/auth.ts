import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { phoneNumber } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "@repo/db";

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
    }),
  ],
});