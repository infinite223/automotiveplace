import { TGarage } from "../utils/types/garage";
import { apiEndpoints } from "./api.endpoints";

export const getGarage = async (userId: string) => {
  const response = await fetch(`${apiEndpoints.getGarage}/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result: TGarage = await response.json();
  console.log(result, "result getGarage");
  return result;
};
