import { TBasicProject, TProject, TProjectCreate } from "../types/project";
import {
  generateRandomDate,
  generateRandomString,
  getRandomInt,
} from "./randomData";

const carMakes = [
  "BMW",
  "Audi",
  "Mercedes",
  "Volkswagen",
  "Ford",
  "Toyota",
  "Honda",
  "Mazda",
];
const carModels = {
  BMW: ["3 Series", "5 Series", "X5", "X3"],
  Audi: ["A3", "A4", "Q5", "Q7"],
  Mercedes: ["C-Class", "E-Class", "GLA", "GLC"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Polo"],
  Ford: ["Focus", "Mustang", "Explorer", "F-150"],
  Toyota: ["Corolla", "Camry", "RAV4", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Fit"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "MX-5"],
};
const engineNames = ["TSI", "TDI", "EcoBoost", "SkyActiv", "Hybrid", "VTEC"];
const transmissionNames = ["Manual", "Automatic", "CVT", "DSG"];

export function generateRandomProjects(count: number) {
  const projects = [];

  for (let i = 0; i < count; i++) {
    const carMake = carMakes[getRandomInt(0, carMakes.length - 1)];
    const carModelOptions = carModels[carMake as keyof typeof carModels];
    const carModel =
      carModelOptions[getRandomInt(0, carModelOptions.length - 1)];

    const project: TProject = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake,
      carModel,
      isVerified: Math.random() < 0.5,
      description: `A well-maintained ${carMake} ${carModel} with excellent performance and features.`,
      imagesCount: getRandomInt(0, 10),
      authorId: generateRandomString(8),
      engineCapacity: parseFloat(
        (Math.random() * (4.5 - 1.5) + 1.5).toFixed(1)
      ),
      engineName: engineNames[getRandomInt(0, engineNames.length - 1)],
      engineStockHp: getRandomInt(100, 400),
      engineStockNm: getRandomInt(150, 500),
      transmissionGears: getRandomInt(5, 8),
      transmissionName:
        transmissionNames[getRandomInt(0, transmissionNames.length - 1)],
      carItemsCount: getRandomInt(0, 20),
      garageId: generateRandomString(8),
      userId: generateRandomString(8),
      imagesUrl: "",
      transmissionType: getRandomInt(0, 3),
      images: [],
      author: {
        id: generateRandomString(8),
        name: "Dawid",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyk55eIDh4grMFV4505_KRgtOm7HTGbm_7Q&s",
        description: "Car enthusiast and collector.",
        email: "dawid@example.com",
      },
    };

    if (project.imagesCount > 0) {
      for (let j = 0; j < project.imagesCount; j++) {
        project.images?.push(`https://example.com/image_${j + 1}.jpg`);
      }
    }

    projects.push(project);
  }

  return projects;
}

export function generateRandomBaseProjects(count: number) {
  const projects = [];

  for (let i = 0; i < count; i++) {
    const carMake = carMakes[getRandomInt(0, carMakes.length - 1)];
    const carModelOptions = carModels[carMake as keyof typeof carModels];
    const carModel =
      carModelOptions[getRandomInt(0, carModelOptions.length - 1)];

    const project: TBasicProject = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      forSell: Math.random() < 0.5,
      isVisible: Math.random() < 0.5,
      carMake,
      carModel,
      isVerified: Math.random() < 0.5,
      description: `A well-maintained ${carMake} ${carModel} with excellent performance and features.`,
      engineName: engineNames[getRandomInt(0, engineNames.length - 1)],
      images: [],
      author: {
        id: generateRandomString(8),
        name: "Dawid",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyk55eIDh4grMFV4505_KRgtOm7HTGbm_7Q&s",
      },
    };

    for (let j = 0; j < getRandomInt(1, 4); j++) {
      project.images?.push(`https://example.com/image_${j + 1}.jpg`);
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
      carModel: generateRandomString(5),
      description: "",
      authorId: "",
      engineCapacity: 2,
      engineName: "TSI",
      engineStockHp: 200,
      carItemsCount: 0,
      engineWasSwapped: false,
      imagesCount: 32,
      engineStockNm: 280,
      transmissionGears: 6,
      transmissionName: "",
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
