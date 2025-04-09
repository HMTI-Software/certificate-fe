"use server";
import { getAllEvents } from "./getAllEvents";

export const getEventByEventId = async (eventUid: string, token: string) => {
  try {
    const allEvents = await getAllEvents(token);
    const filteredEvent = allEvents?.find((event) => event.uid === eventUid);
    return filteredEvent;
  } catch (error) {
    console.error(
      `Error fetching event (${eventUid}) data (SERVER ACTIONS) : `,
      error,
    );
  }
};
