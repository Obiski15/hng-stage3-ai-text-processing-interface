"use client";

import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

import { SUPPORTED_LANGUAGES } from "@/lib/constants";

function Dropdown({ name, selected }: { name: string; selected: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          options={[
            ...SUPPORTED_LANGUAGES.filter((lang) => lang.value !== selected),
          ]}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#003366",
              primary25: "hsla(210, 100%, 20%, 70%)",
            },
          })}
          styles={{
            control: (baseColors) => ({
              ...baseColors,
              color: "#000000",
            }),
          }}
        />
      )}
    />
  );
}

export default Dropdown;
