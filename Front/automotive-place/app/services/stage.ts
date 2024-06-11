import { TStageCreate } from "../utils/types/stage";

export const createStage = async (stage: TStageCreate) => {
  const response = await fetch(`/api/project/add-stage`, {
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
