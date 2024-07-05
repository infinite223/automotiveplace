import { TContentData } from "../types";
import { generateRandomPosts } from "./post";
import { generateRandomProblems } from "./problem";
import { generateRandomProjects } from "./project";
import { generateRandomSpots } from "./spot";

export const contentData: TContentData[] = [
  {
    type: "Project",
    data: generateRandomProjects(1)[0],
  },
  {
    type: "Problem",
    data: generateRandomProblems(1)[0],
  },
  {
    type: "Spot",
    data: generateRandomSpots(1)[0],
  },
  {
    type: "Project",
    data: generateRandomProjects(1)[0],
  },
  {
    type: "Post",
    data: generateRandomPosts(1)[0],
  },
  {
    type: "Post",
    data: generateRandomPosts(1)[0],
  },
];
