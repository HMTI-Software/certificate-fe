"use server";

import { IEventData, IEventResponse } from "@/lib/types/Event";

export const getEventByEventId = async (eventUid: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events?token=${token}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const eventData: IEventResponse<IEventData[]> = await res.json();

    if (!eventData.success && eventData.status !== 200) {
      console.log("eventData error kocak", eventData);
      return null;
    }
    const filteredEvent = eventData.data?.find(
      (event) => event.uid === eventUid,
    );
    return filteredEvent;
  } catch (error) {
    console.error(
      `Error fetching event (${eventUid}) data (SERVER ACTIONS) : `,
      error,
    );
  }
};
