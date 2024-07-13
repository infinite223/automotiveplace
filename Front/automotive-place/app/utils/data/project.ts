import { TPost } from "../types/post";
import { TProblem } from "../types/problem";
import { TProject, TProjectCreate } from "../types/project";
import { TSpot } from "../types/spot";
import {
  generateRandomDate,
  generateRandomString,
  getRandomInt,
} from "./randomData";

export function generateRandomProjects(count: number) {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const project: TProject = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake: generateRandomString(5),
      model: generateRandomString(5),
      isVerified: Math.random() < 0.5,
      description: "",
      imagesCount: getRandomInt(0, 10),
      likesCount: getRandomInt(0, 100),
      authorId: "",
      engineCapacity: 2,
      engineName: "TSI",
      engineStockHp: 200,
      engineStockNm: 280,
      transmissionGears: 6,
      transmissionName: "",
      carItemsCount: getRandomInt(0, 20),
      stagesCount: getRandomInt(0, 5),
      garageId: generateRandomString(8),
      userId: generateRandomString(8),
      images: [] as string[],
      author: {
        id: "",
        name: "Dawid",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyk55eIDh4grMFV4505_KRgtOm7HTGbm_7Q&s",
        description: "",
        email: "",
      },
    };
    if (Math.random() < 0.5) {
      project.images = [];
      const imagesCount = getRandomInt(1, 5);
      for (let j = 0; j < imagesCount; j++) {
        project.images.push(`image_${j}`);
      }
    }
    projects.push(project);
  }
  return projects;
}

export function generateRandomProjectsToCreate(count: number) {
  const projects = [];
  for (let i = 0; i < count; i++) {
    const project: TProjectCreate = {
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake: generateRandomString(5),
      model: generateRandomString(5),
      description: "",
      authorId: "",
      engineCapacity: 2,
      engineName: "TSI",
      engineStockHp: 200,
      engineStockNm: 280,
      transmissionGears: 6,
      transmissionName: "",
      stagesCount: getRandomInt(0, 5),
      garageId: generateRandomString(8),
      inUse: false,
      name: generateRandomString(5),
      projectPrice: getRandomInt(5000, 500000),
    };

    projects.push(project);
  }
  return projects;
}

const projectsData = generateRandomProjects(10);

export { projectsData };
