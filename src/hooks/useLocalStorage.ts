import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined")
      return JSON.parse(localStorage.getItem(key)!) ?? initialValue;

    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return { value, setValue };
}
