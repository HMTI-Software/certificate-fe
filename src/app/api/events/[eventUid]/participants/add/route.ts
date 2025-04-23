import {
  IParticipantAdd,
  IParticipantResponse,
} from "@/lib/types/Participants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string }> },
) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    const { eventUid } = await params;
    const requestBody = await req.json();

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
    if (!eventUid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Event UID is required",
        },
        { status: 400 },
      );
    }
    if (!requestBody) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/participants/${eventUid}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          participants: requestBody,
        }),
      },
    );

    if (!res.ok) {
      const errorResponse: IParticipantResponse<IParticipantAdd> =
        await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: errorResponse.message || "Failed to add participant",
        },
        { status: res.status },
      );
    }

    const participantData: IParticipantResponse<IParticipantAdd> =
      await res.json();
    if (!participantData.success) {
      return NextResponse.json(
        {
          success: false,
          status: participantData.status,
          message: participantData.message || "Failed to add participant",
        },
        { status: participantData.status },
      );
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Participant added successfully",
        data: participantData.data,
      });
    }
  } catch (error) {
    console.error(
      "Error in POST /api/events/[eventUid]/participants/add:",
      error,
    );
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
