"use client";

import { get } from "../../api";

const LoginPart = () => {
  const getUser = async () => {
    const user = await get("/user");

    console.log(user);
  };

  const logout = async () => {
    const logout = await get("/auth/logout");

    console.log(logout);
  };

  const withdraw = async () => {
    const withdraw = await get("/auth/withdraw");

    console.log(withdraw);
  };

  return (
    <>
      <a href="http://localhost:3001/auth/google">login</a>
      <br />
      <button onClick={() => getUser()}>유저정보</button>
      <br />
      <button onClick={() => logout()}>logout</button>
      <br />
      <button onClick={() => withdraw()}>withdraw</button>
    </>
  );
};

export default LoginPart;
