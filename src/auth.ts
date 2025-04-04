import NextAuth from "next-auth";
import { IJWTPayload, ISignInResponse } from "./lib/Interface";
import Credentials from "next-auth/providers/credentials";
import { signInFormSchema } from "./lib/definitions";
import { jwtDecode } from "jwt-decode";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signInFormSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;
        try {
          const response = await fetch(
            `${process.env.FRONTEND_URL}/api/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );
          if (!response.ok) {
            return null;
          }
          const data: ISignInResponse = await response.json();
          if (!data.success || data.status === 400 || data.status === 401) {
            return null;
          }
          // Decode JWT
          try {
            const userData = jwtDecode<IJWTPayload>(data.data.token);
            return {
              id: userData.idUser,
              email: userData.email,
              isPremium: userData.isPremium,
              premiumPackage: userData.premiumPackage,
              roles: userData.roles,
              token: data.data?.token,
            };
          } catch (decodeError) {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
          email: user.email ?? "",
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) return session;
      session.user = {
        ...session.user,
        id: token.sub!,
        email: token.email!,
        isPremium: token.isPremium!,
        premiumPackage: token.premiumPackage!,
        roles: token.roles!,
      };
      session.token = token.token!;

      return session;
    },
    async signIn({ user }) {
      if (!user) return false;

      return true;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  logger: {
    error(error: Error) {
      if (error.name === "CredentialsSignin") return;
      console.error(error);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
});
