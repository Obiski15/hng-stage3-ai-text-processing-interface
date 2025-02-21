"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function Header() {
  const [isNavActive, setIsNavActive] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="w-full flex justify-start items-center gap-5 p-5 bg-[#003366] text-[#ffffff]">
      <Image
        alt="hamburger"
        src="/icons/hamburger.svg"
        width={24}
        height={24}
        onClick={() => {
          setIsNavActive(true);
        }}
      />
      <p className="text-lg font-medium">Language Translator</p>

      <div
        style={{
          transform: `${!isNavActive ? "translateX(-100%)" : "translateX(0)"}`,
        }}
        className={
          "w-full fixed top-0 left-0 bottom-0 bg-[#ffffff] text-[#000000] z-[9999] max-w-[320px] transition-all duration-500"
        }
      >
        <div className="flex flex-col gap-10 px-5 py-10">
          <Image
            alt="close"
            src="/icons/close.svg"
            className="self-end text-black"
            width={24}
            height={24}
            onClick={() => {
              setIsNavActive(false);
            }}
          />
          <div className="w-full flex flex-col justify-center items-center gap-5">
            <Image width={99} height={82} alt="logo" src="/images/logo.png" />
            <h3 className="uppercase text-xl font-medium">
              Translate on the go
            </h3>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div
              className="w-full flex justify-between items-center gap-6 p-2 cursor-pointer hover:bg-[#003366]/20"
              onClick={() => {
                router.push("/history");
              }}
            >
              <Image
                alt="history"
                src="/icons/history.svg"
                width={24}
                height={24}
              />
              <p className="flex-1">History</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
