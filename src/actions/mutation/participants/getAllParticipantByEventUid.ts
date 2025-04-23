"use server";

import { auth } from "@/auth";
import {
  IParticipantResponse,
  IParticipantData,
} from "@/lib/types/Participants";

const getAllParticipanByEventUid = async (
  eventUid: string,
): Promise<IParticipantData[] | null | undefined> => {
  try {
    const session = await auth();
    if (!session) {
      console.error("Session is required");
      return null;
    }
    const token = session?.token;
    if (!token) {
      console.error("Token is required");
      return null;
    }
    if (!eventUid) {
      console.error("Event UID is required");
      return null;
    }

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants`,
      {
        method: "GET",
        next: {
          revalidate: 60, // 1 minute
          tags: ["participants"],
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const participantsData: IParticipantResponse<IParticipantData[]> =
      await res.json();
    if (!participantsData.success && participantsData.status !== 200) {
      return null;
    }
    return participantsData.data;
  } catch (error) {
    console.error(
      `Error fetching event (${eventUid}) data (SERVER ACTIONS) : `,
      error,
    );
  }
};

export default getAllParticipanByEventUid;
