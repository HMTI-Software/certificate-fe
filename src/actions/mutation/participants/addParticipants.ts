"use server";

import { multipleParticipantSchema } from "@/lib/types/General";
import { z } from "zod";
import {
  IParticipantResponse,
  IParticipantAdd,
} from "@/lib/types/Participants";
import { revalidateTag } from "next/cache";

export const addParticipants = async (
  values: z.infer<typeof multipleParticipantSchema>,
  token: string | undefined,
  eventUid: string,
) => {
  try {
    const validatedFields = multipleParticipantSchema.safeParse(values);
    if (!eventUid) {
      return {
        success: false,
        message: "Event UID is required",
      };
    }
    if (!token) {
      return {
        success: false,
        message: "Token is required",
      };
    }
    if (!validatedFields.success || !token) {
      return {
        success: false,
        message: "Invalid event data.",
      };
    }
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants/add?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      },
    );
    if (!res.ok) {
      const errorData: IParticipantResponse<IParticipantAdd> = await res.json();
      console.log("errorData", errorData);
      return {
        success: false,
        message: errorData.message,
      };
    }
    const data: IParticipantResponse<IParticipantAdd> = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    } else {
      revalidateTag("participants");
      return {
        success: true,
        message: "Participants added successfully",
      };
    }
  } catch (error) {
    console.error("ERROR IN PARTICIPANTS ADD (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
