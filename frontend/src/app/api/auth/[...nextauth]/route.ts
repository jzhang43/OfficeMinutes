import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/server/db";

// const GOOGLE_API_SCOPE = [
//   "https://www.googleapis.com/auth/drive",
//   "https://www.googleapis.com/auth/drive.appdata",
//   "https://www.googleapis.com/auth/drive.appfolder",
//   "https://www.googleapis.com/auth/drive.file",
//   "https://www.googleapis.com/auth/drive.resource",
//   "https://www.googleapis.com/auth/documents",
//   "https://www.googleapis.com/auth/documents.readonly",
//   "https://www.googleapis.com/auth/userinfo.profile",
//   "https://www.googleapis.com/auth/userinfo.email",
//   "openid",
// ];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      //   authorization: {
      //     params: {
      //       prompt: "select_account",
      //       access_type: "offline",
      //       response_type: "code",
      //       scope: GOOGLE_API_SCOPE.join(" "),
      //     },
      //   },
    }),
  ],

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name ?? "";
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
