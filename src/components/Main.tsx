"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Image from "next/image";

import { useTranslateLanguage } from "@/services/useTranslateLanguage";
import { useDetectLanguage } from "@/services/useDetectLanguage";
import { useSummarizeText } from "@/services/useSummarizeText";
import { useDebounceTerm } from "@/hooks/useDebounceTerm";
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LANGUAGES_FLAGS,
} from "@/lib/constants";

import Dropdown from "./Dropdown";

interface ISelect {
  label: string;
  value: string;
}

interface IForm {
  sourceLanguage: ISelect;
  targetLanguage: ISelect;
  sourceText: string;
  targetText: string;
}

function Main() {
  const formMethods = useForm<IForm>();
  const { register, setValue, control, getValues } = formMethods;

  const textInput = useWatch({
    control,
    name: "sourceText",
  });

  const selectedSourceLanguage = useWatch({
    control,
    name: "sourceLanguage.value",
  });

  const selectedTargetLanguage = useWatch({
    control,
    name: "targetLanguage.value",
  });

  const debouncedTextInput = useDebounceTerm(textInput, 500);
  const { data: detectedLanguage } = useDetectLanguage(debouncedTextInput);
  const { isLoading: isTranslating, mutate: translateLanguage } =
    useTranslateLanguage();
  const { isLoading: isSummarizing, mutate: summarizeText } =
    useSummarizeText();

  useEffect(() => {
    if (detectedLanguage) {
      const supportedLanguage = SUPPORTED_LANGUAGES.find(
        (language) => language.value === detectedLanguage.detectedLanguage
      );

      if (supportedLanguage) {
        // set source language to the supported language
        setValue("sourceLanguage", supportedLanguage);
      } else {
        toast.error("Language not supported");
      }
    }
  }, [detectedLanguage, setValue]);

  function handleSummary() {
    summarizeText(textInput, {
      onSuccess: (data) => {
        setValue("targetText", data);
      },
      onError: () =>
        toast.error("Unable to process your request. Pls try again"),
    });
  }

  function handleTranslate() {
    if (!selectedSourceLanguage || !selectedTargetLanguage)
      return toast.error("Language not selected");

    translateLanguage(
      {
        sourceLanguage: selectedSourceLanguage,
        targetLanguage: selectedTargetLanguage,
        value: textInput,
      },
      {
        onSuccess: (data) => {
          setValue("targetText", data);
        },
        onError: () =>
          toast.error("Unable to process your request. Pls try again"),
      }
    );
  }

  return (
    <FormProvider {...formMethods}>
      <div className="bg-[#ffffff] w-full flex flex-col justify-start items-start gap-5 p-5">
        <div className="w-full bg-box py-[14px] px-3 shadow-box rounded-[50px] flex justify-between items-center">
          <div className="flex justify-between items-center gap-[10px]">
            <p>{SUPPORTED_LANGUAGES_FLAGS[selectedSourceLanguage] || ""}</p>
            <Dropdown selected={selectedTargetLanguage} name="sourceLanguage" />
          </div>

          <Image src="/icons/swap.svg" alt="swap" width={24} height={24} />

          <div className="flex justify-between items-center gap-[10px]">
            <p>{SUPPORTED_LANGUAGES_FLAGS[selectedTargetLanguage] || ""}</p>
            <Dropdown selected={selectedSourceLanguage} name="targetLanguage" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row-reverse">
          <div className="p-5 bg-[#F5F5F5] shadow-box flex flex-col gap-4 rounded-2xl sm:flex-1">
            <h3 className="text-[#003366] font-medium text-base capitalize">
              Target Language / Summary
            </h3>

            <textarea
              className="w-full h-fit resize-none min-h-[250px]"
              readOnly
              {...register("targetText")}
            ></textarea>
            <div className="self-end flex justify-between items-center gap-5">
              <Image
                className="cursor-pointer"
                src="/icons/copy.svg"
                alt="copy"
                width={24}
                height={24}
                onClick={() => {
                  if (!getValues()?.targetText) return;
                  navigator.clipboard.writeText(getValues()?.targetText);
                  toast.success("Text copied to clipboard");
                }}
              />
              <Image
                className="cursor-pointer"
                src="/icons/share.svg"
                alt="share"
                width={24}
                height={24}
                onClick={() => {
                  if (!getValues()?.targetText) return;
                  navigator.share({
                    title: "AI Processed Text",
                    text: getValues()?.targetText,
                  });
                }}
              />
              <Image
                className="cursor-pointer"
                src="/icons/star.svg"
                alt="star"
                width={24}
                height={24}
              />
            </div>
          </div>

          <div className="p-5 bg-box shadow-box flex flex-col gap-4 rounded-2xl sm:flex-1">
            <h3 className="text-[#003366] font-medium text-base capitalize">
              Source Language
            </h3>

            <textarea
              className="w-full h-fit resize-none min-h-[250px]"
              placeholder="Enter text here..."
              {...register("sourceText")}
            ></textarea>
            <div className="self-end flex justify-between items-center gap-5">
              {textInput?.length >= 150 && (
                <button
                  onClick={handleSummary}
                  disabled={isSummarizing || isTranslating}
                  className="px-6 py-[10px] bg-[#003366] text-[#ffffff] text-center rounded-[100px] font-medium text-sm hover:bg-[#003366]/90"
                >
                  {isSummarizing ? (
                    <Image
                      className="cursor-pointer move-horizontal"
                      src="/icons/arrow.svg"
                      alt="star"
                      width={24}
                      height={24}
                    />
                  ) : (
                    "Summarize"
                  )}
                </button>
              )}
              <button
                onClick={handleTranslate}
                disabled={
                  isSummarizing || isTranslating || !(textInput?.length > 0)
                }
                className="px-6 py-[10px] bg-[#FF6600] text-[#ffffff] text-center rounded-[100px] font-medium text-sm hover:bg-[#FF6600]/90"
              >
                {isTranslating ? (
                  <Image
                    className="cursor-pointer move-horizontal"
                    src="/icons/arrow.svg"
                    alt="star"
                    width={24}
                    height={24}
                  />
                ) : (
                  "Translate"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Main;
