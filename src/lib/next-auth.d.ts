// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isPremium: boolean;
      premiumPackage: "FREEPLAN" | "SILVER" | "GOLD" | "PLATINUM";
      roles: "USER" | "SUPERADMIN";
      isVerifiedEmail: boolean;
    } & DefaultSession["user"];
    expires: string;
    token: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    isPremium: boolean;
    premiumPackage: "FREEPLAN" | "SILVER" | "GOLD" | "PLATINUM";
    roles: "USER" | "SUPERADMIN";
    token?: string;
    isVerifiedEmail: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    isPremium: boolean;
    premiumPackage: "FREEPLAN" | "SILVER" | "GOLD" | "PLATINUM";
    roles: "USER" | "SUPERADMIN";
    isVerifiedEmail: boolean;
    token?: string;
  }
}
