"use server";

import { signInFormSchema } from "@/lib/definitions";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const submitSignInForm = async (
  values: z.infer<typeof signInFormSchema>,
) => {
  const validatedFields = signInFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, message: "Invalid Credentials!" };
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false,
      redirectTo: "/dashboard",
    });
    return { success: true, message: "Sign in successful! Welcome back!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message:
          error.type === "CredentialsSignin"
            ? "Email and password do not match"
            : "Authentication error",
      };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};
