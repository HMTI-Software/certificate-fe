import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({
    success: true,
    status: 200,
    message: "Participant updated successfully",
    data: body,
  });
}
