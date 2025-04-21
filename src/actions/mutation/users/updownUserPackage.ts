"use server";

import { updownPackageFormSchema } from "@/lib/types/General";
import { revalidateTag } from "next/cache";
import { z } from "zod";
export const updownUserPackage = async (
  token: string | undefined,
  userUid: string,
  values: z.infer<typeof updownPackageFormSchema>,
) => {
  try {
    const validatedFields = updownPackageFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid package data.",
      };
    }
    const { premiumPackage } = validatedFields.data;
    if (!userUid || !token) {
      return {
        success: false,
        message: "Invalid user uid / user token.",
      };
    }
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/users/${userUid}/updown-package?token=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          premiumPackage,
        }),
      },
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.message,
      };
    }
    const data = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    } else {
      revalidateTag("users");
      return {
        success: true,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("ERROR IN USER UPDOWN (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
