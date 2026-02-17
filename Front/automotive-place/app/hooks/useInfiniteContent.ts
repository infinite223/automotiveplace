import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { MainContentResponse } from "./useMainContent";
import { getProjectsInfinite } from "../services/project";
import { getPostsInfinite } from "../services/post";
import { TBasicProject } from "../utils/types/project";
import { TContentData } from "../utils/types";
import { ContentType } from "../utils/enums";

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

export const projectToContentData = (project: TBasicProject): TContentData => ({
  type: ContentType.Project,
  data: project,
});

export const addProjectToInfiniteQuery = (
  oldData: InfiniteData<MainContentResponse> | undefined,
  project: TBasicProject
): InfiniteData<MainContentResponse> | undefined => {
  if (!oldData) return oldData;

  const wrapped = projectToContentData(project);

  return {
    ...oldData,
    pages: [
      {
        ...oldData.pages[0],
        data: [wrapped, ...oldData.pages[0].data],
      },
      ...oldData.pages.slice(1),
    ],
  };
};
