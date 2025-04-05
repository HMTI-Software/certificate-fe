import { NextRequest, NextResponse } from "next/server";
import { IEventData, IEventResponse } from "@/lib/types/Event";

export const revalidate = 60; // seconds

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const res = await fetch(`${process.env.BACKEND_URL}/api/events`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["events"],
      },
    });
    const eventData: IEventResponse<IEventData> = await res.json();

    if (!eventData.success && eventData.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          status: eventData.status || 500,
          message: eventData.message || "Failed to fetch events",
        },
        { status: eventData.status || 500 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: "Events fetched successfully",
        data: eventData.data,
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
