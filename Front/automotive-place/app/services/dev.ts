import { ICreateNotification } from "../utils/types";
import { apiEndpoints } from "./api.endpoints";

export const loginAsDev = async (pin: string) => {
  const response = await fetch(`${apiEndpoints.loginDev}?pin=${pin}`);
  if (!response.ok) {
    throw new Error("Coś poszło nie tak");
  }
  const result = await response.json();
  return result as { notification: ICreateNotification };
};
