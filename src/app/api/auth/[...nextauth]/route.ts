import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { get, post } from "../..";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }: any) => {
      if (!account || !account.providerAccountId) {
        return false;
      }

      const isUser = await get("/user/is", {
        params: { providerAccountId: account.providerAccountId },
      });

      if (isUser.data === false) {
        const data = {
          providerAccountId: account.providerAccountId,
          email: user.email,
          name: user.name,
        };
        const signUpResponse = await post("/auth/signup", data);

        console.log(signUpResponse);
      } else {
        const data = { providerAccountId: account.providerAccountId };
        const loginResponse = await post("/auth/login", data);

        console.log(loginResponse);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
