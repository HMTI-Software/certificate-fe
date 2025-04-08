import { IEventResponse } from "@/lib/types/Event";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventUid: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    const { eventUid } = params;
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
      `${process.env.BACKEND_URL}/api/events/${eventUid}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const errorData: IEventResponse = await res.json();
      console.log("ERROR IN DELETE EVENT (ROUTE HANDLER) : ", errorData);
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Failed to delete event",
        },
        { status: 400 },
      );
    }

    const data: IEventResponse = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: data.message as string,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: data.message as string,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ERROR IN DELETE EVENT (ROUTE HANDLER) : ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
