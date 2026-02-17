import { TStageCreate } from "../utils/types/stage";
import { apiEndpoints } from "./api.endpoints";

export const createStage = async (stage: TStageCreate) => {
  const response = await fetch(apiEndpoints.createStage, {
    method: "POST",
    body: JSON.stringify(stage),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to add stage");
  }

  const result = await response.json();
  return result;
};
