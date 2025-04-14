"use server";

import { updateEventSchema } from "@/lib/types/General";
import { z } from "zod";
import { IEventResponse } from "@/lib/types/Event";
import { revalidateTag } from "next/cache";

export const updateEvent = async (
  values: z.infer<typeof updateEventSchema>,
  token: string | undefined,
  eventUid: string,
) => {
  try {
    const validatedFields = updateEventSchema.safeParse(values);
    if (!validatedFields.success || !token) {
      return {
        success: false,
        message: "Invalid event data.",
      };
    }
    const {
      eventName,
      description,
      activityAt,
      prefixCode,
      suffixCode,
      organizer,
      eventTemplate,
      eventTheme,
    } = validatedFields.data;
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/update/${eventUid}?token=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          description,
          activityAt,
          prefixCode,
          suffixCode,
          organizer,
          eventTemplate,
          eventTheme,
        }),
      },
    );
    if (!res.ok) {
      const errorData: IEventResponse = await res.json();
      return {
        success: false,
        message: errorData.message,
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
      revalidateTag("participants");
      return {
        success: true,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("ERROR IN EVENT UPDATE (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
