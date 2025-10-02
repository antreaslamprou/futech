import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { getUserByEmail, createUser  } from "@/lib/db";
import bcrypt from "bcryptjs";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);
        if (!user) return null;
        
        // Block credential login for provider-only accounts
        const isProviderPassword = await bcrypt.compare("google", user.password) ||
          await bcrypt.compare("github", user.password) ||
          await bcrypt.compare("facebook", user.password);

        if (isProviderPassword) { 
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email public_profile",
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
     async signIn({ user, account, profile }) {
      if (!user?.email) return false;

      let dbUser = await getUserByEmail(user.email);

      if (!dbUser) {
        const firstName =
          profile?.given_name ||
          profile?.first_name ||
          (profile?.name ? profile.name.split(" ")[0] : "") || "";

        const lastName =
          profile?.family_name ||
          profile?.last_name ||
          (profile?.name ? profile.name.split(" ").slice(1).join(" ") : "") || "";

        const address = profile?.location || null;
        const country = profile?.locale || null;

        // Create new user in your database
        dbUser = await createUser({
          email: user.email,
          firstName,
          lastName,
          address,
          country,
          password: account.provider,
        });
      }

      user.id = dbUser.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.address = user.address;
        token.country = user.country;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.email = token.email;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };