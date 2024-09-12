import { TContentData } from "../utils/types";

export const getMainContentDataForUser = async (locale: string = "pl") => {
  // get auth user on backend
  const response = await fetch(`/api/content/main/contentdata`, {
    headers: { "Accept-Language": locale },
  });
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result: { hasMore: boolean; data: TContentData[] } =
    await response.json();
  return result;
};
