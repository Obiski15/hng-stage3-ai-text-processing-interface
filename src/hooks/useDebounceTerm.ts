import { useEffect, useState } from "react";

export function useDebounceTerm(value: string, duration: number) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, duration);

    return () => clearInterval(id);
  }, [value, duration]);

  return debouncedValue;
}
