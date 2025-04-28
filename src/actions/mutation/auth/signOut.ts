"use server";

import { signOut } from "@/auth";

export const userSignOut = async () => {
  try {
    await signOut({
      redirect: false,
    });
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: "Sign out failed" };
  }
};
