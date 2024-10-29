"use server";

import * as z from "zod";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // if (existingUser.two_factor_enabled && existingUser.email) {
  //   if (code) {
  //     const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

  //     if (!twoFactorToken) {
  //       return { error: "Invalid code!" };
  //     }

  //     if (twoFactorToken.token !== code) {
  //       return { error: "Invalid code!" };
  //     }

  //     const hasExpired = new Date(twoFactorToken.expires) < new Date();

  //     if (hasExpired) {
  //       return { error: "Code expired!" };
  //     }

  //     await db
  //       .delete(twoFactorTokens)
  //       .where(eq(twoFactorTokens.id, twoFactorToken.id!));

  //     const existingConfirmation = await getTwoFactorConfirmationByUserId(
  //       existingUser.id
  //     );

  //     if (existingConfirmation) {
  //       await db
  //         .delete(twoFactorConfirmations)
  //         .where(eq(twoFactorConfirmations.id, existingConfirmation.id));
  //     }

  //     await db
  //       .insert(twoFactorConfirmations)
  //       .values({ userId: existingUser.id });
  //   } else {
  //     const twoFactorToken = await generateTwoFactorToken(existingUser.email);
  //     await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

  //     return { twoFactor: true };
  //   }
  // }

  try {
    await createSession("");

    redirect("/dashboard"); //callbackUrl
    // return { success: "Logged succesufuly" };
  } catch (error) {
    // return { error: "Something went wrong!" };
    throw error;
  }
};