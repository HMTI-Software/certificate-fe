"use server";

import { signUpFormSchema } from "@/lib/definitions";
import { IAuthResponse } from "@/lib/Interface";
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
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 409) {
      return { error: "User already exists" };
    }
    if (res.status !== 201 || !res.ok) {
    }
    const data = (await res.json()) as IAuthResponse;
    console.log("User Sign Up Data", data);
    return {
      message: "Sign up successful! Welcome aboard!",
      data: { success: data.success, status: data.status },
    };
  } catch (error) {
    console.error(error);
    return { error: "Sign up failed" };
  }
};
