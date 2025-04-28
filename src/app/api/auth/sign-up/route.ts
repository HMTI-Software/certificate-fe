import { IAuthResponse, ISignUpResponseData } from "@/lib/types/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Email and password are required",
        },
        { status: 400 },
      );
    }
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok && res.status === 409) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "User already exists",
        },
        { status: res.status },
      );
    } else if (!res.ok && res.status === 400) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Password must be at least 8 characters long",
        },
        { status: res.status },
      );
    } else if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "An unknown error occurred, Sign up failed",
        },
        { status: res.status },
      );
    }
    const data: IAuthResponse<ISignUpResponseData> = await res.json();
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Sign up successful! Welcome aboard!",
        data: {
          token: data.data?.token || null,
        },
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN SIGN UP (ROUTE HANDLER) : ", error);
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
