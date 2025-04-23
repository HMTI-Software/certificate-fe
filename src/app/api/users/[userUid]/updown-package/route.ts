import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userUid: string }> },
) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
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
    const { premiumPackage } = await req.json();
    const { userUid } = await params;

    if (!userUid) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid user uid.",
        },
        { status: 400 },
      );
    }

    if (!premiumPackage) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid payload.",
        },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/${userUid}/updown-premium`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          premiumPackage,
        }),
      },
    );
    if (!res.ok) {
      const { message } = await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: message || "Something went wrong.",
        },
        { status: res.status },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          status: 200,
          message: "User premium package upgraded successfully.",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("ERROR IN UPGRADE PACKAGE (ROUTE HANDLER): ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to update user premium package.",
      },
      { status: 500 },
    );
  }
}
