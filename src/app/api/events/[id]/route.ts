import { auth } from "@/auth";
import { IEventData, IEventResponse } from "@/lib/Interface";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || session === null) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Event ID is required",
        },
        { status: 400 },
      );
    }
    const res = await fetch(`${process.env.BACKEND_URL}/api/events`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
    const eventData: IEventResponse<IEventData[]> = await res.json();
    if (!eventData.success && eventData.status === 401) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "User not authorized",
        },
        { status: 401 },
      );
    }
    const filteredEvent = eventData.data?.find((event: IEventData) => {
      return event.uid === id;
    });
    if (!filteredEvent) {
      return NextResponse.json(
        {
          success: false,
          status: 404,
          message: "Event not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: "Event fetched successfully",
        data: filteredEvent,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching events (ROUTE HANDLER): ", error.message);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to fetch events",
      },
      { status: 500 },
    );
  }
}
