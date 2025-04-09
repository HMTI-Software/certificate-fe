import { NextResponse } from "next/server";

export async function DELETE() {
  return NextResponse.json({
    success: true,
    status: 200,
    message: "Participant deleted successfully",
    data: null,
  });
}
