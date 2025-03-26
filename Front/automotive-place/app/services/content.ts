import { ICreateNotification, TContentData } from "../utils/types";

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

export const updateSeenContent = async (
  userId: string,
  contentIds: string[]
) => {
  const response = await fetch(`/api/content/get-seen`, {
    method: "POST",
    body: JSON.stringify({ userId, contentIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to update seen content");
  }
};
