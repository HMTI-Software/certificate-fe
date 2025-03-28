"use server";

import { signInFormSchema } from "@/lib/definitions";
import { IAuthResponse } from "@/lib/Interface";
import { z } from "zod";

export const submitSignInForm = async (
  values: z.infer<typeof signInFormSchema>,
) => {
  try {
    const validatedFields = signInFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid form values" };
    }
    const { email, password } = validatedFields.data;
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 200 && res.ok) {
      const data = (await res.json()) as IAuthResponse;
      console.log("User Sign In Data", data);
      return {
        message: data?.message as string,
        data: { success: data.success, status: data.status },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
