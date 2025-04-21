import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userUid: string }> },
) {
  try {
    const { premiumPackage } = await req.json();
    const { userUid } = await params;
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!userUid || !token) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid user uid / user token.",
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
