import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "@/prisma/prismadb";

type IUser = {
  user: User | AdapterUser;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (user) {
        session.user.id = user.id.toString();
      }
      return session;
    },
    async signIn({ user }: IUser): Promise<boolean> {
      try {
        const userExists = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              username: user.name,
              email: user.email,
              image: user.image,
            },
          });
        }
        console.log("sign in successful");
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
