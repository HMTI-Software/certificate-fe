"use server";
import { getAllEvents } from "./getAllEvents";
import { IEventData, IEventResponse } from "@/lib/types/Event";

export const getEventByEventId = async (eventUid: string, token: string) => {
  try {
    if (!eventUid) {
      console.error("Event UID is required");
      return null;
    }
    if (!token) {
      console.error("Token is required");
      return null;
    }
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}?token=${token}`,
      {
        method: "GET",
        next: {
          revalidate: 60, // Revalidate every 60 seconds
          tags: ["events/" + eventUid],
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const eventData: IEventResponse<IEventData> = await res.json();
    if (!eventData.success && eventData.status !== 200) {
      return null;
    }
    return eventData.data;
  } catch (error) {
    console.error(
      `Error fetching event (${eventUid}) data (SERVER ACTIONS) : `,
      error,
    );
  }
};
