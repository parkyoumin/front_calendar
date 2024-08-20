"use client";

import { signIn } from "next-auth/react";

const page = () => {
  return <button onClick={() => signIn("google")}>로그인</button>;
};

export default page;
