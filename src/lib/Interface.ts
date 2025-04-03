//AUTH & USER INTERFACE

/**
 * @interface IJWTPayload
 * This interface is used to define the structure of the user payload
 * that is returned from the server after a successful sign in.
 *
 * @property {string} idUser - The unique identifier of the user.
 * @property {string} email - The email address of the user.
 * @property {boolean} isPremium - Indicates whether the user has a premium account.
 * @property {string} premiumPackage - The package name of the user's premium account.
 * @property {string} roles - The role of the user (e.g., USER, SUPERADMIN).
 * @property {number} iat - The issued at timestamp of the token.
 * @property {number} exp - The expiration timestamp of the token.
 *
 */
export interface IJWTPayload {
  idUser: string;
  email: string;
  isPremium: boolean;
  premiumPackage: "FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD";
  roles: "USER" | "SUPERADMIN";
  iat: number;
  exp: number;
}

/**
 * @interface IAuthResponse
 * A generic interface representing the structure of an authentication response.
 *
 * @template T - The type of the data property, which defaults to either ISignInResponseData or ISignUpResponseData.
 *
 * @property {boolean} success - Indicates whether the authentication request was successful.
 * @property {number} status - The HTTP status code of the authentication response.
 * @property {string} message - A message providing additional information about the authentication response.
 * @property {T} data - The data payload of the authentication response, which contains specific details
 *                      depending on the type of authentication operation (e.g., sign-in or sign-up).
 */
export interface IAuthResponse<
  T = ISignInResponseData | ISignUpResponseData | IUserData,
> {
  success: boolean;
  status: number;
  message: string[] | string;
  data: T;
}

export interface ISignInResponseData {
  token: string;
}

export type ISignInResponse = IAuthResponse<ISignInResponseData>;

export interface ISignUpResponseData {
  token: string;
}

export type ISignUpResponse = IAuthResponse<ISignUpResponseData>;

export interface IAuthSessionUserData {
  id: string;
  email: string;
  isPremium: boolean;
  premiumPackage: "FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD";
  roles: "USER" | "SUPERADMIN";
}

export interface IAuthSession {
  user: IAuthSessionUserData;
  token: string;
  expires: string;
}

export interface IUserData {
  email: string;
  roles: "USER" | "SUPERADMIN";
  createdAt: string;
  isPremium: boolean;
  premiumAt: string | null;
  premiumExpiredAt: string | null;
  premiumPackage: "FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD";
}
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

// export interface IUsersData {
//   email: string;
//   isPremium: boolean;
//   premiumAt: string;
//   createdAt: string;
//   premiumPackage: "FREEPLAN" | "SILVER" | "PLATINUM" | "GOLD";
//   role: "USER" | "SUPERADMIN";
//   events: number;
// }

export interface IEventStakeHolder {
  name: string;
  jabatan: string;
  image: string;
}

// export interface IUserData {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   position: string;
//   image: string;
// }

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
import { string } from "zod";

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
