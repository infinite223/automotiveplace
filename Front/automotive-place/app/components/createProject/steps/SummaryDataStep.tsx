import React, { useEffect, useState } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { BasicDataStep as BasicDataType, StepProps } from "../types";
import { createTagSchema } from "@/app/api/zod.schmas";
import { ZodIssue } from "zod";
import { AMPSwitch } from "../../shared/AMPSwitch";

export const SummaryDataStep: React.FC<StepProps> = ({
  setIsValid,
  registerGetData,
  initialData,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);
  const [isVisable, setIsVisable] = useState(true);
  const [price, setPrice] = useState<string>("");
  const [forSell, setForSell] = useState(false);

  useEffect(() => {
    const result = createTagSchema.safeParse(tags);
    setIsValid(true);

    // if (!result.success) setErrors(result.error.errors);
    // else setErrors(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    registerGetData?.(() => ({
      tags,
      forSell,
      price,
      isVisable,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forSell, forSell, price, isVisable]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-fit flex flex-col gap-4">
        <AMPInput
          name="Tutaj możesz podać łączną cenę projektu:"
          value={price}
          setValue={(v) => setPrice(v.toString())}
          type="number"
        />
        <AMPSwitch
          name="Czy chcesz aby projekt był widoczny dla wszystkich?"
          value={isVisable}
          additionalTailwindCss="ml-1"
          setValue={(v) => setIsVisable(v)}
        />
        <AMPSwitch
          name="Czy projekt może być na sprzedaż?"
          value={forSell}
          additionalTailwindCss="ml-1"
          setValue={(v) => setForSell(v)}
        />
      </div>
    </div>
  );
};
