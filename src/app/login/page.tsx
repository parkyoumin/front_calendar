"use client";

import { signIn } from "next-auth/react";
import { get } from "../api";

const page = () => {
  const getUser = async () => {
    const user = await get("/user", {
      params: { providerAccountId: "104292285458047424868" },
    });

    console.log(user);
  };

  return (
    <>
      <div>
        <button onClick={() => signIn("google")}>로그인</button>
        <button onClick={() => getUser()}>유저정보</button>
      </div>
    </>
  );
};

export default page;
