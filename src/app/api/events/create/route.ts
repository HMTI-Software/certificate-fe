import { IEventCreate, IEventResponse } from "@/lib/types/Event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    const {
      eventName,
      eventDescription,
      eventDate,
      eventPrefixCode,
      eventSuffixCode,
      eventOrganizer,
      eventTheme,
      eventTemplate,
      eventStakeholderName,
      eventStakeholderPosition,
    } = await req.json();

    if (
      !eventName ||
      !eventDescription ||
      !eventDate ||
      !eventPrefixCode ||
      !eventSuffixCode ||
      !eventOrganizer ||
      !eventTheme ||
      !eventTemplate ||
      !eventStakeholderName ||
      !eventStakeholderPosition ||
      !token
    ) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Credentials are not complete",
        },
        { status: 400 },
      );
    }
    const requestBody = {
      eventName: eventName,
      description: eventDescription,
      activityAt: eventDate,
      prefixCode: eventPrefixCode,
      suffixCode: eventSuffixCode,
      organizer: eventOrganizer,
      eventTheme: eventTheme,
      eventTemplate: eventTemplate,
      stakeholders: {
        name: eventStakeholderName,
        position: eventStakeholderPosition,
      },
    };
    const res = await fetch(`${process.env.BACKEND_URL}/api/events/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorData: IEventResponse<IEventCreate> = await res.json();
      return NextResponse.json(
        {
          success: false,
          status: errorData.status,
          message: errorData.message,
        },
        { status: errorData.status },
      );
    }
    const data: IEventResponse<IEventCreate> = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: data.message,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Event created successfully",
        data: data.data,
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN CREATE EVENT (ROUTE HANDLER) : ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
