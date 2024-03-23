import User from "@/app/models/model";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToMongodb } from "@/app/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToMongodb();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // the callbacks will be executed after a well done login
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.avatar) token.avatar = user.avatar;
      if (user?.username) token.username = user.username;
      if (user?.bio) token.bio = user.bio;
      return token;
    },
    async session({ session, token, user }) {
      // user id is stored in ._id when using credentials provider
      if (token?._id) session.user._id = token._id;
      if (token?.avatar) session.user.avatar = token.avatar;
      if (token?.username) session.user.username = token.username;
      if (token?.bio) session.user.bio = token.bio;

      // user id is stored sub ._id when using google provider
      if (token?.sub) session.user._id = token.sub;

      // we'll update the session object with those
      // informations besides the ones it already has
      return session;
    },
  },
  session: {
    strategy: "jwt",
    user: {
      avatar: true,
      id: true,
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
