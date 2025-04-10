import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
  apiRoute,
} from "@/routes";
import { auth } from "./auth";
import jwt from "jsonwebtoken";

export default auth((req) => {
  const { nextUrl } = req;
  if (nextUrl.pathname === "/events") {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  const isLoggedIn: boolean = !!req.auth;

  const isApiRoute: boolean = nextUrl.pathname.startsWith(apiRoute);
  const isApiAuthRoute: boolean = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute: boolean = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;
  if (isApiRoute) return;

  if (nextUrl.pathname === "/auth/verify-email") {
    const token = nextUrl.searchParams.get("token");
    if (token) return;
    if (!token) {
      if (isLoggedIn) {
        return;
      } else {
        return Response.redirect(new URL("/auth/sign-in", nextUrl));
      }
    }
  }

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
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
