import { TPostCreate } from "../utils/types/post";

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
