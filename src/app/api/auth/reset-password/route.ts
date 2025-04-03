import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, InvalidTokenError } from "jwt-decode";

export async function POST(req: NextRequest) {
  try {
    //VALIDASI TOKEN DAN PASSWORD
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Invalid credentials",
        },
        { status: 400 },
      );
    }
    //TRY CATCH DECODE TOKEN
    try {
      const decoded: { email: string; ip: string; iat: number; exp: number } =
        jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        return NextResponse.json(
          {
            success: false,
            status: 401,
            message: "Token has expired",
          },
          { status: 401 },
        );
      }
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        return NextResponse.json(
          {
            success: false,
            status: 401,
            message: "Token has expired",
          },
          { status: 401 },
        );
      }
      throw err;
    }

    //FETCH RESET PASSWORD
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, newPassword: newPassword }),
      },
    );
    const data = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: data.status,
          message: data.message,
        },
        { status: data.status },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: data.status,
        message: "Successfully reset your password",
      },
      { status: data.status },
    );
  } catch (error) {
    console.error("ERROR IN RESET PASSWORD (ROUTE HANDLER) : ", error);
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
