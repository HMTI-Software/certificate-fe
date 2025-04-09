/**
 * Array of routes that public access is allowed without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/docs",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
];

/**
 * Array of routes that are used for authentication purposes.
 * @type {string[]}
 */
export const authRoutes = ["/auth/sign-in", "/auth/sign-up"];
/**
 * The Prefix for API routes that are used for authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Array of routes that are used for API purposes.
 * @type {string}
 */
export const apiRoute = "/api";

/**
 * The prefix for redirect routes after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
