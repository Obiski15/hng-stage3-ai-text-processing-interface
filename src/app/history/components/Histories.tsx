"use client";
import Image from "next/image";

import { TRANSLATE_HISTORY_STORAGE_KEY } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function Histories() {
  const { value, setValue } = useLocalStorage<
    {
      id: number;
      target: { language: string; value: string };
      source: { language: string; value: string };
    }[]
  >(TRANSLATE_HISTORY_STORAGE_KEY, []);

  function removeFromHistory(id: number) {
    setValue((val) => {
      return val.filter((v) => v.id !== id);
    });
  }

  return !value.length ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-medium">No Translate History Recorded</p>
        <Image
          className="cursor-pointer"
          src="/icons/history.svg"
          alt="history"
          width={48}
          height={48}
        />
      </div>
    </div>
  ) : (
    <div className="w-full p-3 sm:p-5">
      {value.map((val) => (
        <div
          key={val.id}
          className="flex flex-col gap-0 border-collapse bg-box rounded-[11px]"
        >
          <div className="w-full flex justify-between items-center gap-1 flex-shrink-0 py-4 pl-3 pr-2 border-b-[#969696] border-b-[1px]">
            <p className="font-medium">{val.source.language}</p>
            <p className="flex-1 text-[#003366]">{val.source.value}</p>
            <Image
              className="cursor-pointer"
              src="/icons/star-active.svg"
              alt="star"
              width={24}
              height={24}
              onClick={() => {
                removeFromHistory(val.id);
              }}
            />
          </div>
          <div className="w-full flex justify-start items-start gap-1 flex-shrink-0 py-4 pl-3 pr-2 border-t-[#969696] border-t-[1px]">
            <p className="font-medium">{val.target.language}</p>
            <p className="flex-1 text-[#FF6600]">{val.target.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Histories;
