import {
  IEventParticipantCertificate,
  IEventResponse,
} from "@/lib/types/Event";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string; participantUid: string }> },
) {
  const { eventUid, participantUid } = await params;

  try {
    if (!eventUid || !participantUid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid event UID or participant UID",
        },
        { status: 400 },
      );
    }
    if (eventUid && participantUid === "preview") {
      return NextResponse.json(
        {
          success: true,
          status: 200,
          message: "Preview certificate",
        },
        { status: 200 },
      );
    }
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/participants/get-certificate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: eventUid,
          uidParticipants: participantUid,
        }),
      },
    );

    if (!res.ok) {
      const error: IEventResponse<IEventParticipantCertificate> =
        await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: error.message,
        },
        { status: res.status },
      );
    }
    const eventData: IEventResponse<IEventParticipantCertificate> =
      await res.json();
    if (!eventData.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: eventData.message,
        },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          status: 200,
          message: "Participant certificate fetched successfully",
          data: eventData.data,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
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
