import { IEventResponse } from "@/lib/types/Event";
import { updateStakeholderSchema } from "@/lib/types/General";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ eventUid: string; stakeholderUid: string }> },
) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
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
    const { eventUid, stakeholderUid } = await params;

    const { eventStakeholderName, eventStakeholderPosition } = await req.json();

    const validatedFields = updateStakeholderSchema.safeParse({
      eventStakeholderName,
      eventStakeholderPosition,
    });
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: validatedFields.error.errors[0].message,
        },
        { status: 400 },
      );
    }
    if (!eventUid || !stakeholderUid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid event uid / stakeholder uid.",
        },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/events/${eventUid}/stakeholder/${stakeholderUid}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: eventStakeholderName,
          position: eventStakeholderPosition,
        }),
      },
    );
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Failed to update stakeholder data",
        },
        { status: res.status },
      );
    }
    const data: IEventResponse = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: data.status,
          message: "Failed to update stakeholder data",
        },
        { status: data.status },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          status: 200,
          message: "Event stakeholder updated successfully",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("ERROR IN UPDATE EVENT (ROUTE HANDLER): ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to update event",
      },
      { status: 500 },
    );
  }
}
