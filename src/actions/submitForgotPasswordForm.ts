"use server";

import { forgotPasswordFormSchema } from "@/lib/definitions";
import { z } from "zod";

export const submitForgotPasswordForm = async (
  values: z.infer<typeof forgotPasswordFormSchema>,
) => {
  const validatedFields = forgotPasswordFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid email address",
    };
  }

  const { email } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.FRONTEND_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );
    if (!response.ok) {
      return {
        success: false,
        message: "Failed to send reset password email",
      };
    }
    const data = await response.json();
    if (!data.success || data.status === 404) {
      return {
        success: false,
        message: "Failed to send reset password email",
      };
    }

    return {
      success: true,
      message: "Reset password email sent successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An unknown error occurred" };
  }
};
