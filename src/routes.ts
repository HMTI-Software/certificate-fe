/**
 * Array of routes that public access is allowed without authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/docs"];

/**
 * Array of routes that are used for authentication purposes.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
];
/**
 * The Prefix for API routes that are used for authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The prefix for redirect routes after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
