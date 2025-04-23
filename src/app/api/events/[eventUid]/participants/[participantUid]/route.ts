import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { eventUid: string; participantUid: string } },
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { eventUid, participantUid } = params;

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
  if (!eventUid || !participantUid) {
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: "Invalid UID",
      },
      { status: 400 },
    );
  }

  if (eventUid && participantUid === "preview") {
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: "Preview Mode",
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      status: 200,
      message: "OK",
    },
    { status: 200 },
  );
}
