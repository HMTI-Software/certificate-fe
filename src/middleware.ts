import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];

export function middleware(req: NextRequest) {
  const role: string = "admin";
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtected && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect jika belum login
  }

  return NextResponse.next();
}
