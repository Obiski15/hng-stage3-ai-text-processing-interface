import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="flex flex-col justify-start items-start gap-0">
      <Header />

      <Main />
    </div>
  );
}
