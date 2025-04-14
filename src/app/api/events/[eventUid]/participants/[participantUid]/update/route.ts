import { IParticipantResponse } from "@/lib/types/Participants";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string; participantUid: string }> },
) {
  try {
    const { eventUid, participantUid } = await params;
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    const { participantName, participantEmail, participantPosition } =
      await req.json();

    if (!eventUid || !participantUid || !token) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid event uid / user token.",
        },
        { status: 400 },
      );
    }

    if (!participantName || !participantEmail || !participantPosition) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid Credentials",
        },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/${eventUid}/participants/${participantUid}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: participantName,
          email: participantEmail,
          position: participantPosition,
        }),
      },
    );

    if (!res.ok) {
      const errorResponse: IParticipantResponse = await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: errorResponse.message || "Failed to update participant",
        },
        { status: res.status },
      );
    }

    const participantData: IParticipantResponse = await res.json();
    if (!participantData.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: participantData.message || "Failed to update participant",
        },
        { status: 400 },
      );
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Participant updated successfully",
      });
    }
  } catch (error) {
    console.error("Error in update participant: ", error);
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
