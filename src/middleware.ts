import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
} from "@/routes";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn: boolean = !!req.auth;

  const isApiAuthRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }
  return;
  // const role: string = "admin";
  // const isProtected: boolean = protectedRoutes.some((route) =>
  //   req.nextUrl.pathname.startsWith(route),
  // );
  // if (isProtected && role !== "admin") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url)); // Redirect jika belum login
  // }
  // return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
