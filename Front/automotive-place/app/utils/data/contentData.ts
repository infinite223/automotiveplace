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

export const generateRandomContent = (count: number): TContentData[] => {
  const contentList: TContentData[] = [];

  for (let index = 0; index < count; index++) {
    const types = ["Project", "Problem", "Spot", "Post"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    let data;

    switch (randomType) {
      case "Project":
        data = generateRandomProjects(1)[0];
        break;
      case "Problem":
        data = generateRandomProblems(1)[0];
        break;
      case "Spot":
        data = generateRandomSpots(1)[0];
        break;
      case "Post":
        data = generateRandomPosts(1)[0];
        break;
      default:
        continue;
    }

    contentList.push({
      type: randomType,
      data: data,
    });
  }

  return contentList;
};
