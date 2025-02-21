"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center gap-5 p-5 bg-[#003366] text-[#ffffff]">
      <div className="flex justify-between items-center gap-5">
        <Image
          alt="arrow"
          src="/icons/arrowLeft.svg"
          width={24}
          height={24}
          onClick={() => router.push("/")}
        />
        <p className="text-lg font-medium">History</p>
      </div>

      <div className="text-[14px]">Clear all</div>
    </div>
  );
}

export default Header;
