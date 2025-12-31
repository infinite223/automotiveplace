import { MainContentResponse } from "../hooks/useMainContent";
import { ContentType } from "../utils/enums";
import { ICreateNotification } from "../utils/types";
import { TBasicPost, TPostCreate } from "../utils/types/post";
import { apiEndpoints } from "./api.endpoints";
import { PAGE_SIZE } from "./consts";

export const createPost = async (post: TPostCreate, locale: string = "en") => {
  const response = await fetch(`/api/post/add-post`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json", "Accept-Language": locale },
  });
  if (!response.ok) {
    throw new Error("Failed to add post");
  }

  const result = await response.json();
  return result as { post: any; notification: ICreateNotification };
};

export const deletePost = async (postId: string, locale: string = "en") => {
  const response = await fetch(`${apiEndpoints.deletePost}/${postId}`, {
    method: "DELETE",
    headers: { "Accept-Language": locale },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message ||
      `Failed to delete post (status: ${response.status})`;

    throw new Error(message);
  }

  const result = await response.json();
  return result;
};

export const getPostsInfinite = async (
  page: number
): Promise<MainContentResponse> => {
  const response = await fetch(
    `${apiEndpoints.getPosts}?page=${page}&limit=${PAGE_SIZE}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error("Failed to get posts");
  }

  const result: {
    data: TBasicPost[];
    hasMore: boolean;
    page: number;
  } = await response.json();
  console.log(result.data, "get posts");
  return {
    data: result.data.map((post) => ({
      data: post,
      type: ContentType.Post,
    })),
    hasMore: result.hasMore,
  };
};
