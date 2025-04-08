"use server";

import { IEventData, IEventResponse } from "@/lib/types/Event";
export const getAllEvents = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events?token=${token}`,
      {
        method: "GET",
        cache: "force-cache",
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
    return eventData.data;
  } catch (error) {
    console.error(
      `Error fetching event (${token}) data (SERVER ACTIONS) : `,
      error,
    );
  }
};
