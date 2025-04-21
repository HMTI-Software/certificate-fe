import { NextRequest, NextResponse } from "next/server";
import { IEventData, IEventResponse } from "@/lib/types/Event";
import { IUserResponse, IUsersData } from "@/lib/types/User";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

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
    const res = await fetch(`${process.env.BACKEND_URL}/api/users/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["users"],
        revalidate: 60,
      },
    });
    const usersData: IUserResponse<IUsersData[]> = await res.json();
    if (!usersData.success && usersData.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          status: usersData.status || 500,
          message: usersData.message || "Failed to fetch users data",
        },
        { status: usersData.status || 500 },
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          status: 200,
          message: "Users fetched successfully",
          data: usersData.data,
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching users (ROUTE HANDLER): ", errorMessage);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: "Failed to fetch users",
      },
      { status: 500 },
    );
  }
}
