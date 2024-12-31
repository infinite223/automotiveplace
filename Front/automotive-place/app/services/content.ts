import { TContentData } from "../utils/types";

export const getMainContentDataForUser = async (
  page: number,
  locale: string = "en"
) => {
  const response = await fetch(`/api/content/main/contentdata/?page=${page}`, {
    headers: { "Accept-Language": locale },
  });
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result: { hasMore: boolean; data: TContentData[] } =
    await response.json();
  return result;
};
