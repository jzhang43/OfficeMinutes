import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

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
  adapter: PrismaAdapter(PrismaClient),
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

  // Include user.id on session
  //   callbacks: {
  //     // async signIn({ account, profile }) {
  //     //   if (account && account.provider === "google" && profile) {
  //     //     return profile.email_verified && profile.email.endsWith("@tufts.edu");
  //     //   }
  //     //   return true; // Do different verification for other providers that don't have `email_verified`
  //     // },

  //     session({ session, user }) {
  //       if (session.user) {
  //         session.user.id = user.id;
  //         session.user.role = user.role;
  //       }
  //       return session;
  //     },
  //   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
