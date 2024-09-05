import { cookies } from "next/headers";
import { get } from "../../api";

const getUser = async () => {
  const cookieStore = cookies();
  const providerAccountId = cookieStore.get("provider_account_id")?.value;

  return await get("/user", {
    params: {
      providerAccountId,
    },
  });
};

const page = async () => {
  const user = await getUser();
  console.log(user);

  return (
    <>
      <a href="http://localhost:3001/auth/google">login</a>
    </>
  );
};

export default page;
