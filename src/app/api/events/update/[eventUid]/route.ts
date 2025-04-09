import { IEventResponse } from "@/lib/types/Event";
import { updateEventSchema } from "@/lib/types/General";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string }> },
) {
  try {
    const { eventUid } = await params;
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    const payload = await req.json();

    const validatedFields = updateEventSchema.safeParse(payload);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: validatedFields.error.errors[0].message,
        },
        { status: 400 },
      );
    }
    if (!eventUid || !token) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid event uid / user token.",
        },
        { status: 400 },
      );
    }

    if (!payload || Object.keys(payload).length === 0) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid payload.",
        },
        { status: 400 },
      );
    }
    const allowedFields = [
      "eventName",
      "description",
      "activityAt",
      "prefixCode",
      "suffixCode",
      "organizer",
      "eventTheme",
      "eventTemplate",
    ];

    const requestBody: Record<string, any> = {};

    allowedFields.forEach((key) => {
      if (
        key in payload &&
        payload[key] !== undefined &&
        payload[key] !== null
      ) {
        requestBody[key] = payload[key];
      }
    });

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/${eventUid}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      },
    );
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Failed to update event",
        },
        { status: res.status },
      );
    }
    const data: IEventResponse = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: data.status,
          message: "Failed to update event",
        },
        { status: data.status },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: "Event updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ERROR IN UPDATE EVENT (ROUTE HANDLER): ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to update event",
      },
      { status: 500 },
    );
  }
}
