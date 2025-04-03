"use server";

import { signUpFormSchema } from "@/lib/definitions";
import { IAuthResponse } from "@/lib/Interface";
import { z } from "zod";

interface ISignUpResponse extends IAuthResponse {
  message: string;
}

export const submitSignUpForm = async (
  values: z.infer<typeof signUpFormSchema>,
) => {
  try {
    const validatedFields = signUpFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
    const { email, password } = validatedFields.data;
    const res = await fetch(`${process.env.FRONTEND_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: ISignUpResponse = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error("ERROR IN SIGN UP (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
