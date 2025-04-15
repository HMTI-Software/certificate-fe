"use server";

import {
  updateEventSchema,
  updateStakeholderSchema,
} from "@/lib/types/General";
import { z } from "zod";
import { IEventResponse } from "@/lib/types/Event";
import { revalidateTag } from "next/cache";

export const updateStakeholderData = async (
  values: z.infer<typeof updateStakeholderSchema>,
  token: string | undefined,
  eventUid: string,
  stakeholderUid: string,
) => {
  try {
    const validatedFields = updateStakeholderSchema.safeParse(values);
    if (!validatedFields.success || !token) {
      return {
        success: false,
        message: "Invalid event stakeholder data.",
      };
    }
    const { eventStakeholderName, eventStakeholderPosition } =
      validatedFields.data;
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events/${eventUid}/stakeholder/${stakeholderUid}/update?token=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventStakeholderName: eventStakeholderName,
          eventStakeholderPosition: eventStakeholderPosition,
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
      return {
        success: true,
        message: data.message,
      };
    }
  } catch (error) {
    console.error(
      "ERROR IN EVENT STAKEHOLDER UPDATE (SERVER ACTION) : ",
      error,
    );
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};
