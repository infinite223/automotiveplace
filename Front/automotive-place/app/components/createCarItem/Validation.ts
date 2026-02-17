import { Status } from "@/app/utils/enums";
import { ICreateNotification, TValidResult } from "@/app/utils/types";
import { TCarItemCreate, isValidItemType } from "@/app/utils/types/carItem";

export const validCarElement = (newElement: TCarItemCreate) => {
  let validResults: TValidResult[] = [];
  let notification: ICreateNotification | null = null;

  if (newElement.authorId.length < 1) {
    validResults.push({
      error: "Brak poprawnych danych o autorze. ",
      valid: false,
    });
  }

  if (!isValidItemType(newElement.itemType)) {
    validResults.push({
      error: "Niepoprawny typ elementu. ",
      valid: false,
    });
  }

  if (validResults.length > 0) {
    notification = {
      log: {
        date: new Date(),
        status: Status.Low,
        title: "Błąd weryfikacji danych elementu",
      },
      timer: 3000,
      showIcon: true,
    };
  }

  return { validResults, notification };
};
