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
    signIn: async ({ user }: any) => {
      if (!user || !user.email) {
        return false;
      }

      const getUserResponse = await get("/user", {
        params: { email: user.email },
      });

      if (getUserResponse.data === false) {
        const data = { email: user.email, name: user.name };
        const signUpResponse = await post("/user", data);

        console.log(signUpResponse);
      } else {
        console.log("로그인 성공");
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
