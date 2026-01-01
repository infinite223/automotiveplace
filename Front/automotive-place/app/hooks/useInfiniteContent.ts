import { useInfiniteQuery } from "@tanstack/react-query";
import { MainContentResponse } from "./useMainContent";
import { getProjectsInfinite } from "../services/project";
import { getPostsInfinite } from "../services/post";

type FetchFn = (page: number) => Promise<MainContentResponse>;

export const useInfiniteContent = (
  key: string,
  fetchFn: FetchFn,
  enabled = true
) => {
  return useInfiniteQuery<MainContentResponse, Error>({
    queryKey: [key],
    queryFn: ({ pageParam = 0 }) => fetchFn(pageParam as number),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

export const useProjects = (enabled: boolean) =>
  useInfiniteContent("projects", getProjectsInfinite, enabled);

export const usePosts = (enabled: boolean) =>
  useInfiniteContent("posts", getPostsInfinite, enabled);

// export const useProblems = (enabled: boolean) =>
//   useInfiniteContent("problems", getProblems, enabled);

// export const useSpots = (enabled: boolean) =>
//   useInfiniteContent("spots", getSpots, enabled);
