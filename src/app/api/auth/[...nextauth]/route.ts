import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {

      return true;
    },
  
    async jwt({token, user, account, profile}) {
      const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'no-email'}});

      token.roles = dbUser?.roles ?? ['no-reoles']  
      token.id = dbUser?.id ?? ['no-id']
      return token; 
      

    },
    async session({session, token, user}){
      if(session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;

    }
  },


};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
