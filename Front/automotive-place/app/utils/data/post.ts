import { TBasicPost } from "../types/post";
import { generateRandomString } from "./randomData";

export function generateRandomPosts(count: number) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const _posts: TBasicPost = {
      id: generateRandomString(10),
      content: "",
      imagesUrl: "",
      title: "Random post",
      isLikedByAuthUser: false,
      author: { id: "", name: "test" },
      lastUpdateAt: new Date(),
      likesCount: 2,
      tags: [],
    };

    posts.push(_posts);
  }
  return posts;
}
