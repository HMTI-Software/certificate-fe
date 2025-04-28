import { IAuthResponse, ISignInResponseData } from "@/lib/types/Auth";
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
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok && res.status === 400) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "User not found. Please check your email and password",
        },
        { status: res.status },
      );
    } else if (!res.ok && res.status === 401) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "Email and password do not match",
        },
        { status: res.status },
      );
    } else if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message: "An unknown error occurred, Sign in failed",
        },
        { status: res.status },
      );
    }
    const data: IAuthResponse<ISignInResponseData> = await res.json();
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Sign in successful! Welcome back!",
        data: {
          token: data.data?.token || null,
        },
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN SIGN IN (ROUTE HANDLER) : ", error);
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
