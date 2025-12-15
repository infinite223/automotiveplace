import { TPostCreate } from "../utils/types/post";
import { apiEndpoints } from "./api.endpoints";

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
  return result;
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
