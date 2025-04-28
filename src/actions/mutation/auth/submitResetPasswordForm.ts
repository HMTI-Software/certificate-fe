"use server";

import { resetPasswordFormSchema } from "@/lib/types/General";
import { z } from "zod";

export const submitResetPasswordForm = async (
  values: z.infer<typeof resetPasswordFormSchema>,
  token: string | undefined,
) => {
  try {
    const validatedFields = resetPasswordFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid password input",
      };
    }
    if (!token) {
      return {
        success: false,
        message: "Token is missing",
      };
    }
    const { password } = validatedFields.data;
    const resetPasswordResponse = await fetch(
      `${process.env.FRONTEND_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      },
    );
    const data = await resetPasswordResponse.json();
    console.log(data);

    if (!data.success || data.status === 400) {
      return {
        success: false,
        message: "Failed to reset your password.",
      };
    }
    return {
      success: true,
      message: "Successfully reset your password.",
    };
  } catch (error) {
    console.error("ERROR IN RESET PASSWORD (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
