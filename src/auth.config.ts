import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "./lib/definitions";
import { IAuthResponse, IUserPayload } from "./lib/Interface";
import { jwtDecode } from "jwt-decode";
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = signInFormSchema.safeParse(credentials);
        if (!validateFields.success) {
          throw new Error("Invalid form values");
        }
        const { email, password } = validateFields.data;
        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/auth/sign-in`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            },
          );
          const data: IAuthResponse = await res.json();
          if (data.status === 200 && data.success) {
            const userData: IUserPayload = jwtDecode(
              data.data?.token as string,
            );
            return {
              id: userData.uid,
              email: userData.email,
              isPremium: userData.isPremium,
              premiumPackage: userData.premiumPackage,
              roles: userData.roles,
            };
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
