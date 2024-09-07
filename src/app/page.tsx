import Aside from "@/components/Aside";
import Calendar from "@/components/Calendar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex m-8" style={{ height: "calc(100vh - 8rem)" }}>
        <Aside />
        <Calendar />
      </div>
    </>
  );
}
