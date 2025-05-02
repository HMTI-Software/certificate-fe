"use server";

import { createEventSchema } from "@/lib/types/General";
import { z } from "zod";
import { IEventCreate, IEventResponse } from "@/lib/types/Event";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

export const createEvent = async (
  values: z.infer<typeof createEventSchema>,
) => {
  try {
    const validatedFields = createEventSchema.safeParse(values);
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: "Session not valid.",
      };
    }
    const token = session.token;
    if (!validatedFields.success || !token) {
      return {
        success: false,
        message: "Invalid event data.",
      };
    }
    const {
      eventName,
      eventDescription,
      eventDate,
      eventCertificatePrefixCode,
      eventCertificateSuffixCode,
      eventOrganizer,
      eventStakeholderName,
      eventStakeholderPosition,
      eventTemplate,
      eventTheme,
    } = validatedFields.data;

    const requestBody = {
      eventName: eventName,
      eventDescription: eventDescription,
      eventDate: eventDate,
      eventPrefixCode: eventCertificatePrefixCode,
      eventSuffixCode: eventCertificateSuffixCode,
      eventOrganizer: eventOrganizer,
      eventTemplate: eventTemplate,
      eventTheme: eventTheme,
      eventStakeholderName: eventStakeholderName,
      eventStakeholderPosition: eventStakeholderPosition,
    };
    const res = await fetch(`${process.env.FRONTEND_URL}/api/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      const errorData: IEventResponse<IEventCreate> = await res.json();
      if (errorData.status === 403) {
        return {
          success: false,
          message: "You've met the maximum limit for creating events",
        };
      }
      return {
        success: false,
        message: errorData.message,
      };
    }
    const data: IEventResponse<IEventCreate> = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    } else {
      revalidateTag("events");
      return {
        success: true,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("ERROR IN EVENT CREATE (SERVER ACTION) : ", error);
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
