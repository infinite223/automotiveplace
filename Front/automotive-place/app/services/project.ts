import { TProjectCreate } from "../utils/types/project";

export const createProject = async (
  carItem: TProjectCreate,
  locale: string = "en"
) => {
  const response = await fetch(`/api/project/add-project`, {
    method: "POST",
    body: JSON.stringify(carItem),
    headers: { "Content-Type": "application/json", "Accept-Language": locale },
  });
  if (!response.ok) {
    throw new Error("Failed to add car items");
  }

  const result = await response.json();
  return result;
};
