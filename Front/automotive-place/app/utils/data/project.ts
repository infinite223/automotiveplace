import { TPost } from "../types/post";
import { TProblem } from "../types/problem";
import { TProject } from "../types/project";
import { TSpot } from "../types/spot";

// Funkcja generująca losową liczbę całkowitą z zakresu [min, max]
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateRandomProblems(count: number) {
  const problems = [];
  for (let i = 0; i < count; i++) {
    const _problem: TProblem = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random post",
    };

    problems.push(_problem);
  }
  return problems;
}

export function generateRandomSpots(count: number) {
  const spots = [];
  for (let i = 0; i < count; i++) {
    const _spot: TSpot = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random post",
    };

    spots.push(_spot);
  }
  return spots;
}

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

const projectsData = generateRandomProjects(10);

export { projectsData };
