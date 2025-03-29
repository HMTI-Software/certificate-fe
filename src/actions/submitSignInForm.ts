"use server";

import { signInFormSchema } from "@/lib/definitions";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { error } from "console";

export const submitSignInForm = async (
  values: z.infer<typeof signInFormSchema>,
) => {
  const validatedFields = signInFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid form values" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return {
      message: "Sign in successful! Welcome back!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        case "CallbackRouteError":
          throw new Error("Invalid callback route");
        default:
          throw new Error("An unknown error occurred during sign in");
      }
    }
    throw error;
  }
};
