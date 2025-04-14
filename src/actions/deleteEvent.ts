"use server";
import { IEventResponse } from "@/lib/types/Event";
import { revalidateTag } from "next/cache";

export const deleteEvent = async (eventUid: string, token: string) => {
  try {
    if (!eventUid || !token) {
      return {
        success: false,
        message: "Invalid event uid / user token.",
      };
    }
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/delete/${eventUid}?token=${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      const errorData: IEventResponse = await res.json();

      return {
        success: false,
        message: errorData.message as string,
      };
    }
    const data: IEventResponse = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    } else {
      revalidateTag("events");
      return {
        success: true,
        message: "Event deleted successfully",
      };
    }
  } catch (error) {
    console.error("ERROR IN EVENT DELETE (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
