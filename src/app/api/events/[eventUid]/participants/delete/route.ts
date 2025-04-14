import { IParticipantResponse } from "@/lib/types/Participants";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string }> },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    const { eventUid } = await params;

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

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/${eventUid}/participants/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const errorData: IParticipantResponse = await res.json();
      console.log(
        "ERROR IN DELETE ALL PARTICIPANT (ROUTE HANDLER) : ",
        errorData,
      );
      return NextResponse.json(
        {
          success: false,
          status: errorData.status,
          message: errorData.message || "Failed to delete all participant",
        },
        { status: errorData.status },
      );
    }

    const participantData: IParticipantResponse = await res.json();
    if (!participantData.success) {
      return NextResponse.json(
        {
          success: false,
          status: participantData.status,
          message: participantData.message as string,
        },
        { status: participantData.status },
      );
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "All participant deleted successfully",
      });
    }
  } catch (error) {
    console.error(
      "Error in DELETE event all participants route handler: ",
      error,
    );
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
}
