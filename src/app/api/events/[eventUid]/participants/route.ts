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
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Authorization token is required",
        },
        { status: 401 },
      );
    }
    if (!eventUid) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Event UID is required",
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
    const participantData: IParticipantResponse<IParticipantData> =
      await res.json();
    if (!participantData.success) {
      return NextResponse.json({
        success: false,
        status: participantData.status,
        message: participantData.message || "Error fetching participants",
      });
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Participants fetched successfully",
        data: participantData.data,
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
