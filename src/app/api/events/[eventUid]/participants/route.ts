import {
  IParticipantData,
  IParticipantResponse,
} from "@/lib/types/Participants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string }> },
) {
  try {
    const { eventUid } = await params;
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!eventUid) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Event UID is required",
      });
    }
    if (!token) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Token is required",
      });
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/participants/${eventUid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const errorData: IParticipantResponse = await res.json();
      return NextResponse.json({
        success: false,
        status: res.status,
        message: errorData.message || "Error fetching participants",
      });
    }
    const data: IParticipantResponse<IParticipantData> = await res.json();
    if (!data.success) {
      return NextResponse.json({
        success: false,
        status: data.status,
        message: data.message || "Error fetching participants",
      });
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Participants fetched successfully",
        data: data.data,
      });
    }
  } catch (error) {
    console.error("ERROR FETCHING PARTICIPANTS (ROUTE HANDLER) : ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Error fetching participants",
      },
      { status: 500 },
    );
  }
}
