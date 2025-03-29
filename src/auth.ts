import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { IUsersData } from "./lib/Interface";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "SUPERADMIN";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const res = await fetch(`${process.env.BACKEND_URL}/api/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJiNGQ2MDg0My1lZmUwLTQwMzEtYmQ2OS05ZGZhZjVmMGRiNDAiLCJlbWFpbCI6ImZhdGloYXR0YWxhNjY2QGdtYWlsLmNvbSIsImlzUHJlbWl1bSI6dHJ1ZSwicHJlbWl1bVBhY2thZ2UiOiJMQVJHRVNUIiwicm9sZXMiOiJVU0VSIiwiaWF0IjoxNzQzMjczMzgwLCJleHAiOjE3NDM1MzI1ODB9.e4czem9Tsos4D_ooQPwMwVMdYFdNisHBZeNAn-BUE_8`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      interface IUsers {
        success: boolean;
        message: string;
        status: number;
        data: IUsersData[];
      }
      const usersData: IUsers = await res.json();
      const user: IUsersData = usersData.data.filter(
        (user) => user.email === token.email,
      )[0];
      token.role = user.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
