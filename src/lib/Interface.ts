export interface IEventData {
  uniqueId: string;
  id: string;
  eventName: string;
  organizer: string;
  certificateNumber: string;
  date: string;
  eventTheme: string;
  initalNumber: number;
  stakeHolder: IEventStakeHolder;
  timestamp: string;
}

interface AuthData {
  token: string;
}

export interface IAuthResponse {
  success: boolean;
  status: number;
  message: string;
  data: AuthData | null;
}

/**
 * @description
 * This interface is used to define the structure of the user payload
 * that is returned from the server after a successful sign in.
 *
 * @interface IUserPayload
 * @property {string} uid - The unique identifier of the user.
 * @property {string} email - The email address of the user.
 * @property {boolean} isPremium - Indicates whether the user has a premium account.
 * @property {string} premiumPackage - The package name of the user's premium account.
 * @property {string} roles - The role of the user (e.g., USER, SUPERADMIN).
 * @property {number} iat - The issued at timestamp of the token.
 * @property {number} exp - The expiration timestamp of the token.
 *
 */
export interface IUserPayload {
  uid: string;
  email: string;
  isPremium: boolean;
  premiumPackage: "FREEPLAN" | "SMALL" | "MEDIUM" | "LARGEST";
  roles: "USER" | "SUPERADMIN";
  iat: number;
  exp: number;
}

export interface IUsersData {
  email: string;
  isPremium: boolean;
  premiumAt: string;
  createdAt: string;
  premiumPackage: "FREEPLAN" | "SMALL" | "MEDIUM" | "LARGEST";
  role: "USER" | "SUPERADMIN";
  events: number;
}

export interface IEventStakeHolder {
  name: string;
  jabatan: string;
  image: string;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  password: string;
  position: string;
  image: string;
}

export interface IPremiumUsers {
  id: number;
  name: string;
  status: "active" | "inactive";
  premiumAt: string;
}

export interface IParticipantData {
  id: number;
  uniqueId: string;
  name: string;
  eventId: string;
  certificateNumber: number;
}

export interface IPricingPackage {
  packageName: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: {
    feature: string;
    icon: React.ReactNode;
  }[];
  packageStyle: string;
}

export interface IAdminContact {
  name: string;
  description: string;
  noTelp: number;
  igUsername: string;
  adminImage: string;
  cardStyle?: string;
  imageStyle?: string;
}

export interface IProfileCard {
  title: string;
  description: string;
  status: number | string;
  bgColor: string;
}

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string; // Tambahkan role ke dalam Session
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface JWT {
    role?: string; // Tambahkan role ke JWT Token
  }
}
