import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Email is required",
        },
        { status: 400 },
      );
    }
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/request-reset-pass`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    if (!res.ok && res.status === 404) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "User email not found",
        },
        { status: res.status },
      );
    } else if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: res.body,
        },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Reset password email sent successfully",
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN FORGOT PASSWORD (ROUTE HANDLER) : ", error);
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
