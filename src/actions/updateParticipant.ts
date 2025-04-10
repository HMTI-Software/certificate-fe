"use server";

import { updateParticipantSchema } from "@/lib/types/General";
import { z } from "zod";
import { IParticipantResponse } from "@/lib/types/Participants";
import { revalidateTag } from "next/cache";

export const updateParticipant = async (
  values: z.infer<typeof updateParticipantSchema>,
  token: string | undefined,
  eventUid: string,
  participantUid: string,
) => {
  try {
    const validatedFields = updateParticipantSchema.safeParse(values);
    if (!validatedFields.success || !token) {
      return {
        success: false,
        message: "Invalid event data.",
      };
    }
    const { name, email, position } = validatedFields.data;
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants/${participantUid}/update?token=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantName: name,
          participantEmail: email,
          participantPosition: position,
        }),
      },
    );
    if (!res.ok) {
      const errorData: IParticipantResponse = await res.json();
      return {
        success: false,
        message: errorData.message,
      };
    }
    const data: IParticipantResponse = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    } else {
      revalidateTag("participants");
      return {
        success: true,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("ERROR IN PARTICIPANT UPDATE (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
