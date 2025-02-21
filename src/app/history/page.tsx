import Header from "./components/Header";
import Histories from "./components/Histories";

export default function History() {
  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <Header />
      <Histories />
    </div>
  );
}
