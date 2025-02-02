import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString(); // Here we are adding the user id to the session object so that we can access it in the frontend.

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user exists in the database
        const user = await User.findOne({ email: profile.email });

        // if not, create a new user

        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error signing in", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
