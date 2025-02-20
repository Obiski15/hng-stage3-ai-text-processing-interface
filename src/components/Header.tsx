import Image from "next/image";

function Header() {
  return (
    <div className="w-full flex justify-start items-center gap-5 p-5 bg-[#003366] text-[#ffffff]">
      <Image
        alt="hamburger"
        src="/icons/hamburger.svg"
        width={24}
        height={24}
      />
      <p className="text-lg font-medium">Language Translator</p>
    </div>
  );
}

export default Header;
