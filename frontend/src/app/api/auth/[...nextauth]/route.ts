import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const GOOGLE_API_SCOPE = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.appfolder",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.resource",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
];

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

  // @TODO(nickbar01234) - Update session on client side
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
