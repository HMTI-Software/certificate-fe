import { IAuthResponse } from "@/lib/types/Auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    const { email, password, roles, packagePremium } = await req.json();
    if (!email || !password || !roles || !packagePremium) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Credentials are required",
        },
        { status: 400 },
      );
    }
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/admin/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
          roles,
          packagePremium,
        }),
      },
    );

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
      const errorData = await res.json();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          message:
            errorData.message ||
            "An unknown error occurred, Add Account failed",
        },
        { status: res.status },
      );
    }
    const data: IAuthResponse = await res.json();
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Account created successfully",
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN USERS ADD (ROUTE HANDLER) : ", error);
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
