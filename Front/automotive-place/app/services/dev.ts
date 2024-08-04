import { ICreateNotification } from "../utils/types";

export const loginAsDev = async (pin: string) => {
  const response = await fetch(`/api/dev/login?pin=${pin}`);
  if (!response.ok) {
    throw new Error("Coś poszło nie tak");
  }
  const result = await response.json();
  return result as { notification: ICreateNotification };
};
