import { ZodSchema } from "zod";
import { TValidResult } from "@/app/utils/types";

export const zodValidFunction =
  <T>(schema: ZodSchema<T>, field: keyof T) =>
  (value: string | number): TValidResult[] => {
    const result = schema.safeParse({
      [field]: value,
    });

    if (result.success) {
      return [{ valid: true, error: "" }];
    }

    const issue = result.error.errors.find((e) => e.path[0] === field);

    return issue
      ? [
          {
            valid: false,
            error: issue.message,
          },
        ]
      : [{ valid: true, error: "" }];
  };
