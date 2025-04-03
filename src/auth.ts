import NextAuth from "next-auth";
import { IAuthResponse, IAuthToken, IUserPayload } from "./lib/Interface";
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
            `${process.env.BACKEND_URL}/api/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );
          if (!response.ok) {
            return null;
          }
          const data: IAuthResponse = await response.json();
          if (!data.success || data.status === 400 || data.status === 401) {
            return null;
          }
          // Decode JWT
          try {
            const userData = jwtDecode<IUserPayload>(
              data.data?.token as string,
            );
            return {
              id: userData.idUser,
              email: userData.email,
              isPremium: userData.isPremium,
              premiumPackage: userData.premiumPackage,
              roles: userData.roles,
              token: data.data?.token,
            } as IAuthToken;
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
          ...user, // Spread semua properti user ke token
          email: user.email ?? "", // Ensure email is a non-nullable string
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
