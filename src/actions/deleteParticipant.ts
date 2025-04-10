"use server";
import { IParticipantResponse } from "@/lib/types/Participants";
import { revalidateTag } from "next/cache";

export const deleteParticipant = async (
  eventUid: string,
  participantUid: string,
  token: string,
) => {
  try {
    if (!eventUid || !token || !participantUid) {
      return {
        success: false,
        message: "Invalid event uid / participant uid / user token.",
      };
    }
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants/${participantUid}/delete?token=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorData: IParticipantResponse = await res.json();
      return {
        success: false,
        message: errorData.message as string,
      };
    }

    const participantData: IParticipantResponse = await res.json();

    if (!participantData.success) {
      return {
        success: false,
        message: participantData.message,
      };
    } else {
      revalidateTag("participants");
      return {
        success: true,
        message: participantData.message,
      };
    }
  } catch (error) {
    console.error("ERROR IN PARTICIPANT DELETE (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
