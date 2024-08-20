import { redirect } from "next/navigation";

export default function Home() {
  // 로그인 상태 fetch 후

  const isLogin = false;

  if (isLogin) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
