import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string }> },
) {
  try {
    const { eventUid } = await params;
    const query = req.nextUrl.searchParams;
    const token = query.get("token");

    if (!eventUid || !token) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Event UID / User Token is required",
        },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const file = formData.get("excel") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "File is required",
        },
        { status: 400 },
      );
    }

    // Forward to backend API
    const backendFormData = new FormData();
    backendFormData.append("excel", file);

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/participants/${eventUid}/add-excel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: backendFormData,
      },
    );

    const responseData = await res.json();

    if (!res.ok || !responseData.success) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: responseData?.message || "Failed to upload participant file",
        },
        { status: res.status },
      );
    } else {
      return NextResponse.json({
        success: true,
        status: 200,
        message: "Participant file uploaded successfully",
        data: responseData.data,
      });
    }
  } catch (error) {
    console.error(
      "Error in POST /api/events/[eventUid]/participants/add-excel:",
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
