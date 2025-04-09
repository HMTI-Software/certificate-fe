"use server";

import {
  IParticipantResponse,
  IParticipantData,
} from "@/lib/types/Participants";

const getAllParticipanByEventUid = async (
  eventUid: string,
  token: string,
): Promise<IParticipantData[] | null | undefined> => {
  try {
    if (!eventUid) {
      console.error("Event UID is required");
    }
    if (!token) {
      console.error("Token is required");
    }

    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/participants?token=${token}`,
      {
        method: "GET",
        next: {
          revalidate: 60, // 1 minute
          tags: ["participants"],
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const participantsData: IParticipantResponse<IParticipantData[]> =
      await res.json();
    if (!participantsData.success && participantsData.status !== 200) {
      console.error("Error data", participantsData);
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
