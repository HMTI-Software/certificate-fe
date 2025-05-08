"use server";

import { revalidateTag } from "next/cache";

export const refreshParticipantsData = async () => {
  // This function is a placeholder for the actual refresh logic.
  // In a real-world scenario, you would implement the logic to refresh the participants data here.
  revalidateTag("participants");
  console.log("Participants data refreshed");
};
