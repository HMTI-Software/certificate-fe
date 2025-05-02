import { IEventResponse } from "@/lib/types/Event";
import { IUserResponse } from "@/lib/types/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userUid: string }> },
) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          status: 401,
          message: "Unauthorized access",
        },
        { status: 401 },
      );
    }
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

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/admin/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uidUser: userUid }),
      },
    );

    if (!res.ok) {
      const errorData: IUserResponse = await res.json();
      console.log("ERROR IN DELETE USERS (ROUTE HANDLER) : ", errorData);
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Failed to delete user.",
        },
        { status: 400 },
      );
    }

    const data: IUserResponse = await res.json();
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: data.message as string,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: data.message as string,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ERROR IN DELETE USER (ROUTE HANDLER) : ", error);
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
