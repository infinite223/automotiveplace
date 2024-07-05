import { TPost } from "../types/post";
import { generateRandomDate, generateRandomString } from "./randomData";

export function generateRandomPosts(count: number) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const _posts: TPost = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random post",
    };

    posts.push(_posts);
  }
  return posts;
}
