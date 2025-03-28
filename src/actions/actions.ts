"use server";

import { signUpFormSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { z } from "zod";

export const submitForm = async (values: z.infer<typeof signUpFormSchema>) => {
  const validatedFields = signUpFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid form values" };
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Data saved!", values);

  return { success: "Data saved!" };
};
