import { TContentData } from "../utils/types";
import { apiEndpoints } from "./api.endpoints";

export const getMainContentDataForUser = async (
  page: number,
  locale: string = "en"
) => {
  const response = await fetch(
    `${apiEndpoints.getMainContentDataForUser}/?page=${page}`,
    {
      headers: { "Accept-Language": locale },
      next: { revalidate: 60 },
    }
  );
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
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to update seen content");
  }
};
