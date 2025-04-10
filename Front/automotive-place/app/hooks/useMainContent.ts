import { useInfiniteQuery } from "@tanstack/react-query";
import { getMainContentDataForUser } from "@/app/services/content";
import { TContentData } from "@/app/utils/types";

type MainContentResponse = {
  data: TContentData[];
  hasMore: boolean;
};

export const useMainContent = () => {
  return useInfiniteQuery<
    MainContentResponse,
    Error,
    MainContentResponse,
    ["main-content"],
    number
  >({
    queryKey: ["main-content"],
    queryFn: async ({ pageParam = 0 }) => {
      return await getMainContentDataForUser(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};
