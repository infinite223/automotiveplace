import React, { useEffect, useState } from "react";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPInput } from "../../shared/AMPInput";
import { BasicDataStep as BasicDataType, StepProps } from "../types";
import { basicDataSchema, createTagSchema } from "@/app/api/zod.schmas";
import { ZodIssue } from "zod";

export const SummaryDataStep: React.FC<StepProps> = ({
  setIsValid,
  registerGetData,
  initialData,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

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
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return <div className="flex flex-col gap-4"></div>;
};
