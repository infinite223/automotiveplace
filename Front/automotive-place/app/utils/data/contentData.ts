import { TContentData } from "../types";
import { generateRandomProjects } from "./project";

export const contentData: TContentData[] = [
  {
    type: "Project",
    data: generateRandomProjects(1)[0],
  },
];
