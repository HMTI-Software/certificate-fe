"use server";

import { signUpFormSchema } from "@/lib/definitions";
import { z } from "zod";

export const submitSignUpForm = async (
  values: z.infer<typeof signUpFormSchema>,
) => {
  try {
    const validatedFields = signUpFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid form values" };
    }
    const { email, password } = validatedFields.data;
    console.log("User Sign Up Data", { email: email, password: password });
    return { success: "Sign up successful! Welcome aboard!" };
  } catch (error) {
    console.error(error);
    return { error: "Sign up failed" };
  }
};
