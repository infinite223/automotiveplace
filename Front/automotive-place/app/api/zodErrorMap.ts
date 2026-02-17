import { z } from "zod";
import { TranslateFn } from "../components/shared/createSafeTranslate";

export const createZodErrorMap =
  (t: TranslateFn): z.ZodErrorMap =>
  (issue, ctx) => {
    switch (issue.code) {
      case z.ZodIssueCode.too_small:
        return {
          message: t("zod.tooSmall", { min: issue.minimum }),
        };

      case z.ZodIssueCode.too_big:
        return {
          message: t("zod.tooBig", { max: issue.maximum }),
        };

      case z.ZodIssueCode.invalid_string:
        if (issue.validation === "email") {
          return { message: t("zod.email") };
        }
        break;
    }

    return { message: ctx.defaultError };
  };
