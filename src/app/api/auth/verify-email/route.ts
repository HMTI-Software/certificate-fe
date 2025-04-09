import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Token is required",
        },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: errorData.message || "Error verifying email",
        },
        { status: res.status },
      );
    }

    const data = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: data.status,
          message: data.message || "Error verifying email",
        },
        { status: data.status },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: "Email verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying email (ROUTE HANDLER) : ", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Error verifying email",
      },
      { status: 500 },
    );
  }
}
